import type { CreateUserDto, UpdateUserDto } from "../models/user.js";
import type { UserService } from "../services/user-service.js";
import type { Request, Response } from "express";

export class UserController {
    constructor(private readonly userService: UserService) {
        console.log("Initialized user controller");
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        const dto: CreateUserDto = req.body;
        const user = await this.userService.createUserAsync(dto);
        res.status(201).json(user);
    };

    getAllUsers = async (_req: Request, res: Response): Promise<void> => {
        const users = await this.userService.getAllUsersAsync();
        res.json(users);
    };

    getUserById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const user = await this.userService.getUserByIdAsync(id);
        res.json(user);
    };

    updateUser = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const dto: UpdateUserDto = req.body;
        const updated = await this.userService.updateUserAsync(id, dto);
        res.json(updated);
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        await this.userService.deleteUserAsync(id);
        res.status(204).send();
    };

    getUploadUrl = async (req: Request, res: Response): Promise<void> => {
        const url = await this.userService.getUploadUrl();
        res.json({ url });
    };
}
