import {Request, Response} from "express";
import {myDataSource} from "../configs/app-data-source";
import {User} from "../entity/user.entity";
import {encrypt} from "../helpers/helpers";
import * as cache from "memory-cache";

export class UserController {

    static async signup(req: Request, res: Response) {
        const {email, password, role} = req.body;
        const encryptedPassword = await encrypt.encryptPassword(password);
        const user = new User();
        user.email = email;
        user.password = encryptedPassword;
        user.role = role;
        const userRepository = myDataSource.getRepository(User);
        await userRepository.save(user);
        const token = encrypt.generateToken({id: user.id});
        return res.status(200).json({message: "User created successfully", token, user})
    }

    static async getUsers(req: Request, res: Response) {
        const data = cache.get("data");
        if(data){
            return res.status(200).json({data});
        }else{
            const userRepository = myDataSource.getRepository(User);
            const users = await userRepository.find();
            cache.put("data", users, 6000);
            return res.status(200).json({
                data: users,
            });
        }
    }

    static async updateUser(req: Request, res: Response){
        const {id} = req.params;
        const {email} = req.body;
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {id}});
        user.email = email;
        await userRepository.save(user);
        res.status(200).json({message: "update", user});
    }

    static async deleteUser(req: Request, res: Response){
        const {id} = req.params;
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {id}});
        await userRepository.remove(user);
        res.status(200).json({message: "Ok"});
    }
}