export interface PostImage {
    id: number;
    s3Key: string;
    position: number;
    url?: string;
}

export interface Post {
    id: number;
    authorId: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    images: PostImage[];
}

export interface CreatePostDto {
    description: string;
    imageKeys?: string[];
}

export interface UpdatePostDto {
    description?: string;
}

export interface UploadUrlDto {
    contentType?: string;
    extension?: string;
}

export interface UploadUrlResponse {
    uploadUrl: string;
    s3Key: string;
}

export interface ListPostsQuery {
    authorId?: number;
    cursor?: number;
    limit?: number;
}
