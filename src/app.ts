import "reflect-metadata"
import * as express from "express"
import {myDataSource} from "./configs/app-data-source"
import routes from "./routes"
import * as cors from "cors"
import {Request, Response} from "express";
import errorHandler from "./helpers/errorHandler";
import logger from "./configs/logger";
import MyResponse from "./functions/MyResponse"

const app = express();
app.use(express.json());
app.use(errorHandler);
const {PORT, DB_HOST} = process.env;
app.use("/api", routes);
app.use(cors());

app.get("*", (req: Request, res: Response) => {
    MyResponse.sendBadGateway(res);
});

myDataSource.initialize()
    .then(
        async () => {
            app.listen(PORT, () => {
                logger.info(`===== Server is running on http://${DB_HOST}:${PORT} =====`);
            });
            logger.info("Data Source has been initialized!");
        }
    ).catch((error) => logger.error(error));
