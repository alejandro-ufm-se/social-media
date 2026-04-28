import type { SearchPostsQuery, SearchPostsResponse } from "../models/post.js";
import { ExploreErrors } from "../errors/errors.js";
import type { PostRepository } from "../repositories/post-repository.js";
import logger from "../lib/logger.js";

export class ExploreService {
    private readonly DefaultLimit = 20;
    private readonly MaxLimit = 50;

    constructor(private readonly postRepository: PostRepository) { }

    async searchPostsAsync(query: SearchPostsQuery): Promise<SearchPostsResponse> {
        const q = query.q?.trim();
        if (!q) {
            throw ExploreErrors.MissingQuery;
        }

        const limit = query.limit ?? this.DefaultLimit;
        if (limit < 1 || limit > this.MaxLimit) {
            throw ExploreErrors.InvalidLimit;
        }

        const posts = await this.postRepository.searchPostsAsync(q, limit, query.cursor);
        const nextCursor = posts.length === limit ? posts[posts.length - 1]!.id : null;

        logger.info("Explore search executed", { query: q, count: posts.length });
        return { posts, nextCursor };
    }
}
