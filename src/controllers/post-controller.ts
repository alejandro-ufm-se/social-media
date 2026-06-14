import type { Request, Response } from "express";
import type { PostService } from "../services/post-service.js";
import type {
    CreatePostDto,
    ListPostsQuery,
    UpdatePostDto,
    UploadUrlDto,
} from "../models/post.js";
import { PostErrors } from "../errors/errors.js";
import logger from "../lib/logger.js";

export class PostController {
    constructor(private readonly postService: PostService) {
        logger.info("Initialized post controller");
    }

    private requireUserId(req: Request): number {
        const id = req.user?.id;
        if (id === undefined) {
            throw PostErrors.Unauthenticated;
        }
        return id;
    }

    getUploadUrl = async (req: Request, res: Response): Promise<void> => {
        const userId = this.requireUserId(req);
        const dto: UploadUrlDto = req.body ?? {};
        const result = await this.postService.getUploadUrlAsync(userId, dto);
        res.json(result);
    };

    createPost = async (req: Request, res: Response): Promise<void> => {
        const userId = this.requireUserId(req);
        const dto: CreatePostDto = req.body;
        const post = await this.postService.createPostAsync(userId, dto);
        res.status(201).json(post);
    };

    getPostById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const post = await this.postService.getPostByIdAsync(id);
        res.json(post);
    };

    listPosts = async (req: Request, res: Response): Promise<void> => {
        const query: ListPostsQuery = {
            ...(req.query.authorId !== undefined && { authorId: Number(req.query.authorId) }),
            ...(req.query.cursor !== undefined && { cursor: Number(req.query.cursor) }),
            ...(req.query.limit !== undefined && { limit: Number(req.query.limit) }),
        };
        const posts = await this.postService.listPostsAsync(query);
        res.json(posts);
    };

    updatePost = async (req: Request, res: Response): Promise<void> => {
        const userId = this.requireUserId(req);
        const id = Number(req.params.id);
        const dto: UpdatePostDto = req.body;
        const post = await this.postService.updatePostAsync(userId, id, dto);
        res.json(post);
    };

    deletePost = async (req: Request, res: Response): Promise<void> => {
        const userId = this.requireUserId(req);
        const id = Number(req.params.id);
        await this.postService.deletePostAsync(userId, id);
        res.status(204).send();
    };
}
