import express = require("express");
import {authorization} from "../helpers/authorization";
import {authentification} from "../middlewares/auth.middleware";
import {AuthController} from "../controllers/AuthController";
import { Roles } from "../helpers/roles";

const router = express.Router();

router.post("/login", AuthController.login);

router.get(
    "/profile",
    authentification,
    authorization([Roles.User, Roles.Admin]),
    AuthController.getProfile
);

export default router;