import type { ExploreService } from "../services/explore-service.js";
import type { SearchPostsQuery } from "../models/post.js";
import type { Request, Response } from "express";
import logger from "../lib/logger.js";

export class ExploreController {
    constructor(private readonly exploreService: ExploreService) {
        logger.info("Initialized explore controller");
    }

    search = async (req: Request, res: Response): Promise<void> => {
        const q = typeof req.query.q === "string" ? req.query.q : "";
        const query: SearchPostsQuery = { q };
        if (req.query.limit) query.limit = Number(req.query.limit);
        if (req.query.cursor) query.cursor = Number(req.query.cursor);

        const result = await this.exploreService.searchPostsAsync(query);
        res.json(result);
    };
}
