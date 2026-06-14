import { Router } from "express";
import { PostController } from "../controllers/post-controller.js";
import { PostRepository } from "../repositories/post-repository.js";
import { PostService } from "../services/post-service.js";
import logger from "../lib/logger.js";

const postRoutes = Router();

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRoutes.use((_req, _res, _next) => {
    logger.info("Incoming request to post routes", { path: _req.path, method: _req.method });
    _next();
});

postRoutes.post("/v1/images/upload-url", postController.getUploadUrl);
postRoutes.post("/v1/posts", postController.createPost);
postRoutes.get("/v1/posts", postController.listPosts);
postRoutes.get("/v1/posts/:id", postController.getPostById);
postRoutes.patch("/v1/posts/:id", postController.updatePost);
postRoutes.delete("/v1/posts/:id", postController.deletePost);

export default postRoutes;
