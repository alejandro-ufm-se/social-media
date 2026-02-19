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

export interface UpdateUserDto {
    email?: string;
    name?: string;
    password?: string;
    role?: number;
}