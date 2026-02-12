export class FriendRepository {
    private friendships: Map<number, Set<number>> = new Map();
    private readonly latencyMs: number = 150;

    private callToExternalServiceAsync(ms: number = this.latencyMs): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    addFriendAsync = async (userId: number, friendId: number): Promise<void> => {
        await this.callToExternalServiceAsync();

        if (!this.friendships.has(userId)) {
            this.friendships.set(userId, new Set());
        }
        if (!this.friendships.has(friendId)) {
            this.friendships.set(friendId, new Set());
        }

        this.friendships.get(userId)!.add(friendId);
        this.friendships.get(friendId)!.add(userId);
    };

    removeFriendAsync = async (userId: number, friendId: number): Promise<void> => {
        await this.callToExternalServiceAsync();
        this.friendships.get(userId)?.delete(friendId);
        this.friendships.get(friendId)?.delete(userId);
    };

    getFriendIdsAsync = async (userId: number): Promise<number[]> => {
        await this.callToExternalServiceAsync();
        const friends = this.friendships.get(userId);
        return friends ? [...friends] : [];
    };

    areFriendsAsync = async (userId: number, friendId: number): Promise<boolean> => {
        await this.callToExternalServiceAsync();
        return this.friendships.get(userId)?.has(friendId) ?? false;
    };

    removeAllFriendshipsForUserAsync = async (userId: number): Promise<void> => {
        await this.callToExternalServiceAsync();
        const friends = this.friendships.get(userId);
        if (friends) {
            for (const friendId of friends) {
                this.friendships.get(friendId)?.delete(userId);
            }
            this.friendships.delete(userId);
        }
    };
}
