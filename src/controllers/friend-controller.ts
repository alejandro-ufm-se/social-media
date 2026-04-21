import type { FriendService } from "../services/friend-service.js";
import type { Request, Response } from "express";
import logger from "../lib/logger.js";

export class FriendController
{
    constructor(private readonly friendService: FriendService)
    {
        logger.info("Initialized friend controller");
    }

    addFriend = async (req: Request, res: Response): Promise<void> => {
        const userId = Number(req.params.id);
        const friendId = Number(req.params.friendId);
        await this.friendService.addFriendAsync(userId, friendId);
        res.status(201).json({ message: "Friend added successfully." });
    };

    getFriends = async (req: Request, res: Response): Promise<void> => {
        const userId = Number(req.params.id);
        const friends = await this.friendService.getFriendsAsync(userId);
        res.json(friends);
    };

    removeFriend = async (req: Request, res: Response): Promise<void> => {
        const userId = Number(req.params.id);
        const friendId = Number(req.params.friendId);
        await this.friendService.removeFriendAsync(userId, friendId);
        res.status(204).send();
    };
}
