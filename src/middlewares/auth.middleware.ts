import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";

export const authentification = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        req["currentUser"] = jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, token invalid or expired" });
    }
};