import { DataSource } from "typeorm"
import  * as dotenv  from "dotenv"

dotenv.config()

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})