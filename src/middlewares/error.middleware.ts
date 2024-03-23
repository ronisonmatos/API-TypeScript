import {NextFunction, Request, Response} from "express";
import logger from "../configs/logger";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    logger.error(`${error.message}`);
    return res.status(500).json({message: "Internal server error"});
};