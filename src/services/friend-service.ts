import type { User } from '../models/user.js';
import { UserErrors, RelationshipErrors } from '../errors/errors.js';
import type { UserRepository } from '../repositories/user-repository.js';
import type { FriendRepository } from '../repositories/friend-repository.js';
import logger from '../lib/logger.js';

export class FriendService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly friendRepository: FriendRepository,
    ) { }

    async addFriendAsync(userId: number, friendId: number): Promise<void> {
        if (userId === friendId) {
            throw RelationshipErrors.SelfFriendship;
        }

        const user = await this.userRepository.getUserByIdAsync(userId);
        if (!user) {
            throw UserErrors.UserNotFound;
        }

        const friend = await this.userRepository.getUserByIdAsync(friendId);
        if (!friend) {
            throw RelationshipErrors.InexistentUser;
        }

        const alreadyFriends = await this.friendRepository.areFriendsAsync(userId, friendId);
        if (alreadyFriends) {
            throw RelationshipErrors.AlreadyFriends;
        }

        await this.friendRepository.addFriendAsync(userId, friendId);
        logger.info('Friend added', { userId, friendId });
    }

    async removeFriendAsync(userId: number, friendId: number): Promise<void> {
        const user = await this.userRepository.getUserByIdAsync(userId);
        if (!user) {
            throw UserErrors.UserNotFound;
        }

        const friend = await this.userRepository.getUserByIdAsync(friendId);
        if (!friend) {
            throw RelationshipErrors.InexistentUser;
        }

        const areFriends = await this.friendRepository.areFriendsAsync(userId, friendId);
        if (!areFriends) {
            throw RelationshipErrors.NotFriends;
        }

        await this.friendRepository.removeFriendAsync(userId, friendId);
        logger.info('Friend removed', { userId, friendId });
    }

    async getFriendsAsync(userId: number): Promise<User[]> {
        const user = await this.userRepository.getUserByIdAsync(userId);
        if (!user) {
            throw UserErrors.UserNotFound;
        }

        const friendIds = await this.friendRepository.getFriendIdsAsync(userId);

        const friends: User[] = [];
        for (const fId of friendIds) {
            const friend = await this.userRepository.getUserByIdAsync(fId);
            if (friend) {
                friends.push(friend);
            }
        }

        return friends;
    }
}
