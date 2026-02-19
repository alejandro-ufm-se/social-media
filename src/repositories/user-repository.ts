import type { User } from "../models/user.js";

export class UserRepository 
{
    private users: Map<number, User> = new Map();
    private nextId: number = 1000;
    private readonly latencyMs: number = 150; // Simulate network latency

    // We can remove this once we have a real database
    private callToExternalServiceAsync(ms: number = this.latencyMs): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    createUserAsync = async (user: Omit<User, "id" | "friends">): Promise<User> => {
        await this.callToExternalServiceAsync();
        const newUser: User = {
            ...user,
            id: this.nextId++,
            friends: [],
        };
        this.users.set(newUser.id, newUser);
        return { ...newUser };
    };

    getAllUsersAsync = async (): Promise<User[]> => {
        await this.callToExternalServiceAsync();
        return [...this.users.values()].map((u) => ({ ...u }));
    };

    getUserByIdAsync = async (id: number): Promise<User | undefined> => {
        await this.callToExternalServiceAsync();
        const user = this.users.get(id);
        return user ? { ...user } : undefined;
    };

    getUserByEmailAsync = async (email: string): Promise<User | undefined> => {
        await this.callToExternalServiceAsync();
        for (const user of this.users.values()) {
            if (user.email === email) {
                return { ...user };
            }
        }
        return undefined;
    };

    updateUserAsync = async (id: number, fields: Partial<Omit<User, "id" | "friends">>): Promise<User | undefined> => {
        await this.callToExternalServiceAsync();
        const existing = this.users.get(id);
        if (!existing) {
            return undefined;
        }
        const updated: User = { ...existing, ...fields };
        this.users.set(id, updated);
        return { ...updated };
    };

    deleteUserAsync = async (id: number): Promise<boolean> => {
        await this.callToExternalServiceAsync();
        return this.users.delete(id);
    };
}
