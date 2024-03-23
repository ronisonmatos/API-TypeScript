import express = require("express");
import CityController from "../controllers/CityController";

const router = express.Router();

router.get("/city", CityController.getAll)
router.get("/city/:id", CityController.update)
router.post("/city", CityController.insert);
router.put("/city/:id", CityController.update)
router.delete("/city/:id", CityController.remove)

export default router;