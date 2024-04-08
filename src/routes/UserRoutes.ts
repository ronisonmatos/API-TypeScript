import express = require("express");
import {UserController} from "../controllers/UserController";
import {authorization} from "../helpers/authorization";
import {authentification} from "../middlewares/auth.middleware";
import {Roles} from "../helpers/roles";

const router = express.Router();

router.get(
    "/list",
    authentification,
    authorization([Roles.User, Roles.Admin]),
    UserController.getUsers
);

router.get(
    "/:id",
    authentification,
    authorization([Roles.User, Roles.Admin]),
    UserController.getUserById
);

router.post(
    "/create",
    UserController.insertUser
);

router.put(
    "/update/:id",
    authentification,
    authorization([Roles.User, Roles.Admin]),
    UserController.updateUserById
);

router.delete(
    "/disable/:id",
    authentification,
    authorization([Roles.User, Roles.Admin]),
    UserController.desableUserById
);

router.delete(
    "/delete/:id",
    authentification,
    authorization([Roles.Admin]),
    UserController.deleteUser
);
export default router;