import express = require("express");
import {DeviceController} from "../controllers/DeviceController";
import {authentification} from "../middlewares/auth.middleware";
import {Roles} from "../helpers/roles";
import {authorization} from "../helpers/authorization";

const router = express.Router();

router.get(
    "/list",
    authentification,
    authorization([Roles.Admin]), 
    DeviceController.getAllDevices
);

router.get(
    "/:id", 
    authentification,
    authorization([Roles.Admin, Roles.User]), 
    DeviceController.getDeviceById
);

router.post(
    "/create", 
    authentification,
    authorization([Roles.Admin, Roles.User]), 
    DeviceController.insertDevice
);

router.put(
    "/delete/:id", 
    authentification,
    authorization([Roles.Admin, Roles.User]), 
    DeviceController.updateDeviceById
);

export default router;