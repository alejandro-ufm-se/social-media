import { Router } from "express";
import { UserService } from "../services/user-service.js";
import { UserController } from "../controllers/user-controller.js";
import { UserRepository } from "../repositories/user-repository.js";

const userRoutes = Router();

export const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.use((_req, _res, _next) => {
    console.log("Hello from user routes");
    _next();
});

userRoutes.post("/v1/register", userController.createUser);
userRoutes.get("/v1/users", userController.getAllUsers);
userRoutes.get("/v1/users/:id", userController.getUserById);
userRoutes.patch("/v1/users/:id", userController.updateUser);
userRoutes.delete("/v1/users/:id", userController.deleteUser);

export default userRoutes;
