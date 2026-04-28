export interface Post {
    id: number;
    authorId: number;
    body: string;
    createdAt: Date;
}

export interface CreatePostDto {
    authorId: number;
    body: string;
}

export interface SearchPostsQuery {
    q: string;
    limit?: number;
    cursor?: number;
}

export interface SearchPostsResponse {
    posts: Post[];
    nextCursor: number | null;
}
