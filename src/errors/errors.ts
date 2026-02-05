import { ServiceException } from "./serviceException.js";

export class UserErrors {
    public static readonly InvalidPassword : ServiceException =
        new ServiceException(1000, "User entered an invalid password.");

    public static readonly InvalidEmail : ServiceException =
        new ServiceException(1001, "User entered an invalid email.");
}

export class RelationshipErrors {
    public static readonly InexistentUser : ServiceException =
        new ServiceException(2000, "User tried to start relationship with inexistent user.");
}