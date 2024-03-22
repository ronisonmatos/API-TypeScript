import "reflect-metadata"
import * as express from "express"
import { myDataSource } from "./configs/app-data-source"
import routes from "./routes"
import * as cors from "cors"
import * as dotenv from "dotenv"

const startup = async () => {

    dotenv.config()

    const port = process.env.PORT || 3000

    await myDataSource.initialize();

    const app = express()
    app.use(express.json())
    app.use(cors());
    app.use("/api", routes);

    app.listen(port, () => console.log(`Application is up and running in port: ${port}`));

}

startup();