import type { Post, CreatePostDto } from "../models/post.js";
import { prisma } from "../lib/prisma.js";

export class PostRepository {
    createPostAsync = async (dto: CreatePostDto): Promise<Post> => {
        const created = await prisma.post.create({
            data: {
                authorId: dto.authorId,
                body: dto.body,
            },
        });
        return {
            id: created.id,
            authorId: created.authorId,
            body: created.body,
            createdAt: created.createdAt,
        };
    };

    searchPostsAsync = async (
        query: string,
        limit: number,
        cursor?: number,
    ): Promise<Post[]> => {
        const posts = await prisma.post.findMany({
            where: {
                body: { search: query },
            },
            orderBy: { createdAt: "desc" },
            take: limit,
            ...(cursor !== undefined && {
                skip: 1,
                cursor: { id: cursor },
            }),
        });
        return posts.map((p) => ({
            id: p.id,
            authorId: p.authorId,
            body: p.body,
            createdAt: p.createdAt,
        }));
    };
}
