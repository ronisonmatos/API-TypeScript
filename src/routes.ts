import express = require("express");
import CityRoutes from "./routes/CityRoutes";
import UserRoutes from "./routes/UserRoutes";
import DeviceRoutes from "./routes/DeviceRoutes";

const routes = express.Router();

routes.use(UserRoutes);
routes.use(CityRoutes);
routes.use(DeviceRoutes);

export default routes;