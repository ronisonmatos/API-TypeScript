import {NextFunction, Request, Response} from "express";
import UserService from "../services/user.service";
import MyResponse from "../functions/MyResponse";
import logger from "../configs/logger";

export const authorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            logger.error("Token Not Found");
            return MyResponse.sendUnauthorized(res, undefined, "Token Not Found");
        }

        const userService = new UserService();
        const user = userService.getUserById(req["currentUser"].userId);
        if (!roles.includes((await user).role)) {
            logger.info(`[${(await user).id}] - Access denied, you don't have permission.`);
            return MyResponse.sendUnauthorized(res, undefined, "Access denied, you don't have permission.");
        }
        next();
    };
};