export interface User {
    email: string;
    name: string;
    password: string;
    id: number;
    role: number;
    friends: number[];
}

export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    role?: number;
}

export interface CreateUserResponse {
    id: number;
    email: string;
    authToken: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    email: string;
    authToken: string;
}

export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
    role?: number;
}