import { error } from 'node:console';
import type { User } from '../models/user.js';

export class UserService {
    private PasswordLength : number = 8;

    registerUser(userToRegister: User) : User {
        console.log("Starting to register a user!");
        console.log("Validating password for user.");

        const password = userToRegister.password;
        if (!password) {
            console.log("Password is empty");
            throw new Error("Empty Password");
        }

        if (password.length < this.PasswordLength)
        {
            console.log("Password length is too small");
            throw new Error("Password length");
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
}