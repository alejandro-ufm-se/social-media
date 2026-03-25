import type { LoginDto, LoginResponse } from '../models/user.js';
import { UserErrors } from '../errors/errors.js';
import type { UserRepository } from '../repositories/user-repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    async loginAsync(dto: LoginDto): Promise<LoginResponse> {
        if (!dto.email || !dto.password) {
            throw UserErrors.MissingRequiredFields;
        }

        const user = await this.userRepository.getUserByEmailAsync(dto.email);
        if (!user) {
            throw UserErrors.InvalidCredentials;
        }

        const isValid = await bcrypt.compare(dto.password, user.password);
        if (!isValid) {
            throw UserErrors.InvalidCredentials;
        }

        const authToken = this.generateToken(user.id, user.email);

        return {
            id: user.id,
            email: user.email,
            authToken,
        };
    }

    generateToken(userId: number, email: string): string {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

        const payload = {
            sub: userId,
            email,
        };

        return jwt.sign(payload, jwtSecretKey, { expiresIn: '7d' });
    }
}
