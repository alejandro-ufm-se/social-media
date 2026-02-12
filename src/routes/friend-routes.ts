import { Router } from "express";
import { FriendService } from "../services/friend-service.js";
import { FriendController } from "../controllers/friend-controller.js";
import { FriendRepository } from "../repositories/friend-repository.js";
import { userRepository } from "./user-routes.js";

const friendRoutes = Router();

const friendRepository = new FriendRepository();
const friendService = new FriendService(userRepository, friendRepository);
const friendController = new FriendController(friendService);

friendRoutes.use((_req, _res, _next) => {
    console.log("Hello from friend routes");
    _next();
});

friendRoutes.post("/v1/users/:id/friends/:friendId", friendController.addFriend);
friendRoutes.get("/v1/users/:id/friends", friendController.getFriends);
friendRoutes.delete("/v1/users/:id/friends/:friendId", friendController.removeFriend);

export default friendRoutes;
