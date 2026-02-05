import type { User } from "../models/user.js";
import type { UserService } from "../services/user-service.js";
import type { Request, Response } from "express";

export class UserController {
    constructor(private readonly userService: UserService) {
        console.log("Initialized user controller");
    }

    registerUser = async (_req : Request, _res : Response) => {
        let user : User = _req.body;
        let registeredUser = await this.userService.registerUserAsync(user);

        _res.json(registeredUser);
    }

    simulate = (_req : Request, _res : Response) => {
        this.userService.simulation(5000, 1).then(() => {
            this.userService.simulation(2000, 2);
        }).then(() => {
            console.log("Task 1 Done");
        }).finally(() => {
            console.log("Task 2 Done");
            _res.send("SUCCESS");
        })
    }
}