import type { User, CreateUserDto, UpdateUserDto, CreateUserResponse } from '../models/user.js';
import { UserErrors } from '../errors/errors.js';
import type { UserRepository } from '../repositories/user-repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getPutObjectSignedUrl } from '../lib/s3.js';
import logger from '../lib/logger.js';

export class UserService {
    private readonly PasswordLength: number = 8;

    constructor(private readonly userRepository: UserRepository) { }

    async createUserAsync(dto: CreateUserDto): Promise<CreateUserResponse> {
        if (!dto.name || !dto.email || !dto.password) {
            throw UserErrors.MissingRequiredFields;
        }

        if (dto.password.length < this.PasswordLength) {
            throw UserErrors.InvalidPassword;
        }

        const existing = await this.userRepository.getUserByEmailAsync(dto.email);
        if (existing) {
            throw UserErrors.UserAlreadyExists;
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const result = await this.finishUserCreationAsync(dto, hashedPassword);
        logger.info('User created', { userId: result.id, email: result.email });
        return result;
    }

    async finishUserCreationAsync(dto: CreateUserDto, hashedPassword: string) {
        const user = await this.userRepository.createUserAsync({
            email: dto.email,
            name: dto.name,
            password: hashedPassword,
            role: dto.role ?? 1,
        });

        // generate token
        let authToken = this.generateToken(user.id, user.email);

        let response : CreateUserResponse = {
            id: user.id,
            email: user.email,
            authToken: authToken
        };
        return response;
    }

    generateToken(userId: number, email: string): string {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

        const payload = {
            sub: userId,
            email
        };

        return jwt.sign(payload, jwtSecretKey, { expiresIn: '7d' });
    };


    async getAllUsersAsync(): Promise<User[]> {
        return this.userRepository.getAllUsersAsync();
    }

    async getUserByIdAsync(id: number): Promise<User> {
        const user = await this.userRepository.getUserByIdAsync(id);
        if (!user) {
            throw UserErrors.UserNotFound;
        }
        return user;
    }

    async updateUserAsync(id: number, dto: UpdateUserDto): Promise<User> {
        const existing = await this.userRepository.getUserByIdAsync(id);
        if (!existing) {
            throw UserErrors.UserNotFound;
        }

        if (dto.password !== undefined && dto.password.length < this.PasswordLength) {
            throw UserErrors.InvalidPassword;
        }

        if (dto.email !== undefined) {
            const emailOwner = await this.userRepository.getUserByEmailAsync(dto.email);
            if (emailOwner && emailOwner.id !== id) {
                throw UserErrors.UserAlreadyExists;
            }
        }

        const updated = await this.userRepository.updateUserAsync(id, dto);
        logger.info('User updated', { userId: id });
        return updated as User;
    }

    async deleteUserAsync(id: number): Promise<void> {
        const existing = await this.userRepository.getUserByIdAsync(id);
        if (!existing) {
            throw UserErrors.UserNotFound;
        }
        await this.userRepository.deleteUserAsync(id);
        logger.info('User deleted', { userId: id });
    }

    async getUploadUrl(): Promise<string> {
        return getPutObjectSignedUrl('test/test.txt');
    }
}
