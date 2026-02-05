import type { User } from "../models/user.js";

export class UserRepository {
    callToExternalServiceAsync = async () : Promise<string> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("External call success.");
            }, 1000);
        })
    }

    saveUserAsync = async (user: User) : Promise<string> => {
        console.log("Initiating connection to DB");
        await this.callToExternalServiceAsync();
        console.log("Finished saving user");
        return "1";
    }

    saveRelationshipAsync = async (user: User) : Promise<string> => {
        console.log("Initiating connection to DB");
        await this.callToExternalServiceAsync();
        console.log("Finished saving user to relationship.");
        return "2";
    }
}