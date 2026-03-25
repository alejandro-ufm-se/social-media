import type { LoginDto } from "../models/user.js";
import type { AuthService } from "../services/auth-service.js";
import type { Request, Response } from "express";

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    login = async (req: Request, res: Response): Promise<void> => {
        const dto: LoginDto = req.body;
        const result = await this.authService.loginAsync(dto);
        res.json(result);
    };
}
