import {Request, Response} from "express";
import {myDataSource} from "../configs/app-data-source";
import {User} from "../entity/user.entity";
import {encrypt} from "../helpers/helpers";
import logger from "../configs/logger";
import myResponse from "../functions/MyResponse";
import UserService from "../services/user.service";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return myResponse.sendInternalError(res, "Email and password are required.");
            }

            const userService = new UserService();
            const user = await userService.getUserByEmail(email);

            if (!user) {
                logger.error("Login attempt with invalid email");
                return myResponse.sendInternalError(res, "Invalid credentials.");
            }

            const isPasswordValid = await encrypt.comparePassword(user.password, password);
            if (!isPasswordValid || user.deletedAt !== null) {
                logger.error("Login attempt with invalid password");
                return myResponse.sendInternalError(res, "Invalid credentials.");
            }

            const token = encrypt.generateToken({ id: user.id });
            logger.info(`Login successful: ${user.email}`);
            return myResponse.sendSuccess(res, user, "Login successful.", token);

        } catch (error) {
            logger.error(`Login error: ${error}`);
            return myResponse.sendInternalError(res, "An error occurred during the login process.");
        }
    }

    static async getProfile(req: Request, res: Response) {
        if (!req["currentUser"]) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: {id: req["currentUser"].userId},
        });
        return res.status(200).json({...user, password: undefined});
    }
}