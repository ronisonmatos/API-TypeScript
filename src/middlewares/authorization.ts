import {NextFunction, Request, Response} from "express";
import {myDataSource} from "../configs/app-data-source";
import {User} from "../entity/user.entity";

export const authorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRepo = myDataSource.getRepository(User);
        const user = await userRepo.findOne({
            where: {id: req["currentUser"].id},
        });
        console.log(user);
        if (!roles.includes(user.role)) {
            return res.status(403).json({message: "Forbidden"});
        }
        next();
    };
};