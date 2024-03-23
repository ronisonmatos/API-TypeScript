import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../dto/user.dto";

dotenv.config();
const { JWT_SECRET } = process.env;

export class encrypt {
    static async encryptPassword(password: string) {
        return bcrypt.hash(password, 12);
    }

    static async comparePassword(hashPassword: string, password: string) {
        return bcrypt.compare(password, hashPassword);
    }

    static generateToken(payload: payload) {
        if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
        return jwt.sign({ userId: payload.id }, JWT_SECRET, { expiresIn: "1d" });
    }
}