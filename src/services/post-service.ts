import { randomUUID } from "crypto";
import type {
    CreatePostDto,
    ListPostsQuery,
    Post,
    UpdatePostDto,
    UploadUrlDto,
    UploadUrlResponse,
} from "../models/post.js";
import type { PostRepository } from "../repositories/post-repository.js";
import { PostErrors } from "../errors/errors.js";
import { getGetObjectSignedUrl, getPutObjectSignedUrl } from "../lib/s3.js";
import logger from "../lib/logger.js";

export class PostService {
    private readonly MaxDescriptionLength = 5000;
    private readonly MaxImagesPerPost = 10;
    private readonly DefaultListLimit = 20;
    private readonly MaxListLimit = 100;

    constructor(private readonly postRepository: PostRepository) { }

    async getUploadUrlAsync(userId: number, dto: UploadUrlDto): Promise<UploadUrlResponse> {
        const ext = (dto.extension ?? "").replace(/^\./, "").toLowerCase();
        const safeExt = /^[a-z0-9]{1,8}$/.test(ext) ? `.${ext}` : "";
        const s3Key = `posts/${userId}/${randomUUID()}${safeExt}`;
        const uploadUrl = await getPutObjectSignedUrl(s3Key, dto.contentType);
        return { uploadUrl, s3Key };
    }

    async createPostAsync(userId: number, dto: CreatePostDto): Promise<Post> {
        const description = (dto.description ?? "").trim();
        if (!description) {
            throw PostErrors.InvalidDescription;
        }
        if (description.length > this.MaxDescriptionLength) {
            throw PostErrors.InvalidDescription;
        }

        const imageKeys = dto.imageKeys ?? [];
        if (imageKeys.length > this.MaxImagesPerPost) {
            throw PostErrors.TooManyImages;
        }
        const ownerPrefix = `posts/${userId}/`;
        for (const key of imageKeys) {
            if (!key.startsWith(ownerPrefix)) {
                throw PostErrors.InvalidImageKey;
            }
        }

        const post = await this.postRepository.createPostAsync({
            authorId: userId,
            description,
            imageKeys,
        });
        logger.info("Post created", { postId: post.id, authorId: userId, imageCount: imageKeys.length });
        return this.attachImageUrls(post);
    }

    async getPostByIdAsync(id: number): Promise<Post> {
        const post = await this.postRepository.getPostByIdAsync(id);
        if (!post) {
            throw PostErrors.PostNotFound;
        }
        return this.attachImageUrls(post);
    }

    async listPostsAsync(query: ListPostsQuery): Promise<Post[]> {
        const limit = Math.min(query.limit ?? this.DefaultListLimit, this.MaxListLimit);
        const posts = await this.postRepository.listPostsAsync(query.authorId, query.cursor, limit);
        return Promise.all(posts.map((p) => this.attachImageUrls(p)));
    }

    async updatePostAsync(userId: number, id: number, dto: UpdatePostDto): Promise<Post> {
        const existing = await this.postRepository.getPostByIdAsync(id);
        if (!existing) {
            throw PostErrors.PostNotFound;
        }
        if (existing.authorId !== userId) {
            throw PostErrors.NotPostOwner;
        }

        if (dto.description !== undefined) {
            const description = dto.description.trim();
            if (!description || description.length > this.MaxDescriptionLength) {
                throw PostErrors.InvalidDescription;
            }
        }

        const updated = await this.postRepository.updatePostAsync(id, dto);
        if (!updated) {
            throw PostErrors.PostNotFound;
        }
        logger.info("Post updated", { postId: id, authorId: userId });
        return this.attachImageUrls(updated);
    }

    async deletePostAsync(userId: number, id: number): Promise<void> {
        const existing = await this.postRepository.getPostByIdAsync(id);
        if (!existing) {
            throw PostErrors.PostNotFound;
        }
        if (existing.authorId !== userId) {
            throw PostErrors.NotPostOwner;
        }
        await this.postRepository.deletePostAsync(id);
        logger.info("Post deleted", { postId: id, authorId: userId });
    }

    private async attachImageUrls(post: Post): Promise<Post> {
        const images = await Promise.all(
            post.images.map(async (img) => ({
                ...img,
                url: await getGetObjectSignedUrl(img.s3Key),
            })),
        );
        return { ...post, images };
    }
}
