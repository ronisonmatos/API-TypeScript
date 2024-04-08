import express = require("express");
import CityRoutes from "./routes/CityRoutes";
import UserRouter from "./routes/UserRoutes";
import DeviceRoutes from "./routes/DeviceRoutes";
import AuthRouters from "./routes/AuthRouters";

const routes = express.Router();

routes.use("/user", UserRouter);
routes.use(CityRoutes);
routes.use("/device", DeviceRoutes);
routes.use(AuthRouters);

export default routes;