import { Router } from "express";
import { ExploreService } from "../services/explore-service.js";
import { ExploreController } from "../controllers/explore-controller.js";
import { PostRepository } from "../repositories/post-repository.js";
import logger from "../lib/logger.js";

const exploreRoutes = Router();

const postRepository = new PostRepository();
const exploreService = new ExploreService(postRepository);
const exploreController = new ExploreController(exploreService);

exploreRoutes.use((_req, _res, _next) => {
    logger.info("Incoming request to explore routes", { path: _req.path, method: _req.method });
    _next();
});

exploreRoutes.get("/v1/search", exploreController.search);

export default exploreRoutes;
