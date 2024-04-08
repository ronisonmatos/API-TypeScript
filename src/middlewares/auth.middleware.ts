import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import myResponse from "../functions/MyResponse";

export const authentification = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return myResponse.sendUnauthorized(res, "Unauthorized");

    const token = header.split(' ')[1];
    if (!token) return myResponse.sendUnauthorized(res, "Unauthorized");

    try {
        req["currentUser"] = jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        if (!header) return myResponse.sendUnauthorized(res, "Unauthorized, token invalid or expired");
    }
};