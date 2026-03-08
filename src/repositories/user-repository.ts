import type { User } from "../models/user.js";
import { prisma } from "../lib/prisma.js";

export class UserRepository
{
    createUserAsync = async (user: Omit<User, "id" | "friends">): Promise<User> => {
        const created = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                auth: {
                    create: {
                        passwordHash: user.password,
                    },
                },
            },
            include: { auth: true },
        });
        return {
            id: created.id,
            email: created.email,
            name: created.name ?? "",
            password: created.auth?.passwordHash ?? "",
            role: user.role,
            friends: [],
        };
    };

    getAllUsersAsync = async (): Promise<User[]> => {
        const users = await prisma.user.findMany({
            include: { auth: true },
        });
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            name: u.name ?? "",
            password: u.auth?.passwordHash ?? "",
            role: 0,
            friends: [],
        }));
    };

    getUserByIdAsync = async (id: number): Promise<User | undefined> => {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { auth: true },
        });
        if (!user) return undefined;
        return {
            id: user.id,
            email: user.email,
            name: user.name ?? "",
            password: user.auth?.passwordHash ?? "",
            role: 0,
            friends: [],
        };
    };

    getUserByEmailAsync = async (email: string): Promise<User | undefined> => {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { auth: true },
        });
        if (!user) return undefined;
        return {
            id: user.id,
            email: user.email,
            name: user.name ?? "",
            password: user.auth?.passwordHash ?? "",
            role: 0,
            friends: [],
        };
    };

    updateUserAsync = async (id: number, fields: Partial<Omit<User, "id" | "friends">>): Promise<User | undefined> => {
        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) return undefined;

        const updated = await prisma.user.update({
            where: { id },
            data: {
                ...(fields.email !== undefined && { email: fields.email }),
                ...(fields.name !== undefined && { name: fields.name }),
                ...(fields.password !== undefined && {
                    auth: {
                        upsert: {
                            create: { passwordHash: fields.password },
                            update: { passwordHash: fields.password },
                        },
                    },
                }),
            },
            include: { auth: true },
        });
        return {
            id: updated.id,
            email: updated.email,
            name: updated.name ?? "",
            password: updated.auth?.passwordHash ?? "",
            role: fields.role ?? 0,
            friends: [],
        };
    };

    deleteUserAsync = async (id: number): Promise<boolean> => {
        try {
            await prisma.userAuth.deleteMany({ where: { userId: id } });
            await prisma.user.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    };
}
