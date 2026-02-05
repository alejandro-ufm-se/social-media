import { error } from 'node:console';
import type { User } from '../models/user.js';
import { UserErrors } from '../errors/errors.js';

export class UserService {
    private PasswordLength : number = 8;

    registerUser(userToRegister: User) : User {
        console.log("Starting to register a user!");
        console.log("Validating password for user.");

        const password = userToRegister.password;
        if (!password || password.length < this.PasswordLength) {
            throw UserErrors.InvalidPassword;
        }

        console.log("Sending data to DB");
        return {
            email : userToRegister.email,
            name: userToRegister.name,
            password: "encrypted",
            id: 100,
            role: 1,
            friends: []
        }
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