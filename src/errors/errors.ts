import { ServiceException } from "./serviceException.js";

export class UserErrors {
    public static readonly InvalidPassword : ServiceException =
        new ServiceException(1000, "User entered an invalid password.", 400);

    public static readonly InvalidEmail : ServiceException =
        new ServiceException(1001, "User entered an invalid email.", 400);

    public static readonly UserNotFound : ServiceException =
        new ServiceException(1002, "User not found.", 404);

    public static readonly UserAlreadyExists : ServiceException =
        new ServiceException(1003, "A user with this email already exists.", 409);

    public static readonly MissingRequiredFields : ServiceException =
        new ServiceException(1004, "Missing required fields: name, email, and password.", 400);

    public static readonly FailedHashingPassword : ServiceException =
        new ServiceException(1005, "Failed hashing password.", 500);

    public static readonly InvalidCredentials : ServiceException =
        new ServiceException(1006, "Invalid email or password.", 401);
}

export class RelationshipErrors {
    public static readonly InexistentUser : ServiceException =
        new ServiceException(2000, "User tried to start relationship with inexistent user.", 404);

    public static readonly SelfFriendship : ServiceException =
        new ServiceException(2001, "A user cannot add themselves as a friend.", 400);

    public static readonly AlreadyFriends : ServiceException =
        new ServiceException(2002, "These users are already friends.", 409);

    public static readonly NotFriends : ServiceException =
        new ServiceException(2003, "These users are not friends.", 400);
}

export class ExploreErrors {
    public static readonly MissingQuery : ServiceException =
        new ServiceException(3000, "Search query is required.", 400);

    public static readonly InvalidLimit : ServiceException =
        new ServiceException(3001, "Limit must be between 1 and 50.", 400);
}