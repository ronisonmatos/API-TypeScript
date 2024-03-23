import express = require("express");
import CityRoutes from "./routes/CityRoutes";
import {userRouter} from "./routes/UserRoutes";
import DeviceRoutes from "./routes/DeviceRoutes";

const routes = express.Router();

routes.use(userRouter);
routes.use(CityRoutes);
routes.use(DeviceRoutes);

export default routes;