import "reflect-metadata"
import * as express from "express"
import { myDataSource } from "./configs/app-data-source"
import routes from "./routes"
import * as cors from "cors"
import * as dotenv from "dotenv"
import { Request, Response } from "express";
import {errorHandler} from "./middlewares/error.middleware";
import {userRouter} from "./routes/UserRoutes";
import deviceRoutes from "./routes/DeviceRoutes";
import logger from "./configs/logger";

const app = express();
app.use(express.json());
app.use(errorHandler);
const {PORT} = process.env;
app.use("/auth", userRouter);
app.use("/api", routes);

app.get("*",(req: Request, res: Response) => {
    res.status(505).json({message: "Bad Request"});
});

myDataSource.initialize()
    .then(
        async () => {
            app.listen(PORT, () => {
            logger.info(`===== Server is running on http://localhost:${PORT} =====`);
        });
            logger.info("Data Source has been initialized!");
    }).catch((error) => logger.error(error));
