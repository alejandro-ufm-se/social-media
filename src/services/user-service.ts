import { error } from 'node:console';
import type { User } from '../models/user.js';
import { UserErrors } from '../errors/errors.js';
import type { UserRepository } from '../repositories/user-repository.js';

export class UserService {
    private PasswordLength : number = 8;

    constructor(private readonly userRepository: UserRepository) { }

    async registerUserAsync(userToRegister: User) : Promise<User> {
        console.log("Starting to register a user!");
        console.log("Validating password for user.");

        const password = userToRegister.password;
        if (!password || password.length < this.PasswordLength) {
            throw UserErrors.InvalidPassword;
        }

        let user : User = {
            email : userToRegister.email,
            name: userToRegister.name,
            password: "encrypted",
            id: 100,
            role: 1,
            friends: []
        };

        let promise1 = this.userRepository.saveUserAsync(user);
        let promise2 = this.userRepository.saveRelationshipAsync(user);
        const [promise1Result, promise2Result] = await Promise.all([promise1, promise2]);
        console.log(promise1Result);
        console.log(promise2Result);
        return user;
    }

    simulation(delay: number, identifier: number) : Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`Completed Task ${identifier}`);
                resolve("Completed Task!!");
            }, delay);
        })
    }
}