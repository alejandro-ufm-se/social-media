import { prisma } from "../lib/prisma.js";
import type { Post } from "../models/post.js";

interface CreatePostInput {
    authorId: number;
    description: string;
    imageKeys: string[];
}

const mapPost = (p: {
    id: number;
    authorId: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    images: { id: number; s3Key: string; position: number }[];
}): Post => ({
    id: p.id,
    authorId: p.authorId,
    description: p.description,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    images: p.images
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((img) => ({ id: img.id, s3Key: img.s3Key, position: img.position })),
});

export class PostRepository {
    createPostAsync = async (input: CreatePostInput): Promise<Post> => {
        const created = await prisma.post.create({
            data: {
                authorId: input.authorId,
                description: input.description,
                images: {
                    create: input.imageKeys.map((s3Key, index) => ({
                        s3Key,
                        position: index,
                    })),
                },
            },
            include: { images: true },
        });
        return mapPost(created);
    };

    getPostByIdAsync = async (id: number): Promise<Post | undefined> => {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { images: true },
        });
        return post ? mapPost(post) : undefined;
    };

    listPostsAsync = async (
        authorId: number | undefined,
        cursor: number | undefined,
        limit: number,
    ): Promise<Post[]> => {
        const posts = await prisma.post.findMany({
            ...(authorId !== undefined && { where: { authorId } }),
            ...(cursor !== undefined && { cursor: { id: cursor }, skip: 1 }),
            orderBy: { id: "desc" },
            take: limit,
            include: { images: true },
        });
        return posts.map(mapPost);
    };

    updatePostAsync = async (
        id: number,
        fields: { description?: string },
    ): Promise<Post | undefined> => {
        const updated = await prisma.post.update({
            where: { id },
            data: {
                ...(fields.description !== undefined && { description: fields.description }),
            },
            include: { images: true },
        });
        return mapPost(updated);
    };

    deletePostAsync = async (id: number): Promise<boolean> => {
        try {
            await prisma.post.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    };
}
