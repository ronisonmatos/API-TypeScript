import { DataSource } from "typeorm";
import  * as dotenv  from "dotenv";

dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV} = process.env;

export const myDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: ["src/entity/*.ts"],
    logging: NODE_ENV === "dev",
    synchronize: true,
});