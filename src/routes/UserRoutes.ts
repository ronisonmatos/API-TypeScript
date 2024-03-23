import express = require("express");
import {UserController} from "../controllers/user.controller";
import {authorization} from "../middlewares/authorization";
import {authentification} from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.get(
    "/users",
    authentification,
    authorization(["user","admin"]),
    UserController.getUsers
);
Router.get(
    "/profile",
    authentification,
    authorization(["user", "admin"]),
    AuthController.getProfile
);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.put(
    "/update/:id",
    authentification,
    authorization(["user", "admin"]),
    UserController.updateUser
);
Router.delete(
    "/delete/:id",
    authentification,
    authorization(["admin"]),
    UserController.deleteUser
);
export { Router as userRouter };