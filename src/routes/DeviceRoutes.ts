import express = require("express");
import DeviceController from "../controllers/DeviceController";

const router = express.Router();

router.get("/devices", DeviceController.getAllDevices);
router.get("/devices/:id", DeviceController.getDeviceById);
router.post("/devices", DeviceController.insertDevice);
router.put("/devices/:id", DeviceController.updateDeviceById);

export default router;