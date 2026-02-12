import type { User, CreateUserDto, UpdateUserDto } from '../models/user.js';
import { UserErrors } from '../errors/errors.js';
import type { UserRepository } from '../repositories/user-repository.js';

export class UserService {
    private readonly PasswordLength: number = 8;

    constructor(private readonly userRepository: UserRepository) { }

    async createUserAsync(dto: CreateUserDto): Promise<User> {
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

        const user = await this.userRepository.createUserAsync({
            email: dto.email,
            name: dto.name,
            password: dto.password,
            role: dto.role ?? 1,
        });

        return user;
    }

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
        return updated as User;
    }

    async deleteUserAsync(id: number): Promise<void> {
        const existing = await this.userRepository.getUserByIdAsync(id);
        if (!existing) {
            throw UserErrors.UserNotFound;
        }
        await this.userRepository.deleteUserAsync(id);
    }
}
