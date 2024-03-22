import express = require("express");
import UserController from "../api/UserController";

const router = express.Router();

router.get("/users", UserController.getAllUsers)
router.get("/users/:id", UserController.updateUserById)
router.post("/users", UserController.insertUser);
router.put("/users/:id", UserController.updateUserById)
router.delete("/users/:id", UserController.removeUserById)

export default router;