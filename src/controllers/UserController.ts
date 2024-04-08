import {Request, response, Response} from "express";
import {myDataSource} from "../configs/app-data-source";
import {User} from "../entity/user.entity";
import {encrypt} from "../helpers/helpers";
import * as cache from "memory-cache";
import logger from "../configs/logger";
import myResponse from "../functions/MyResponse";
import UserService from "../services/user.service";
import MyResponse from "../functions/MyResponse";

export class UserController {

    static async insertUser(req: Request, res: Response) {
        const  userService = new UserService();
        const {email, name, password, role} = req.body;
        const encryptedPassword = await encrypt.encryptPassword(password);
        const user = new User();
        user.email = email;
        user.name = name;
        user.password = encryptedPassword;
        user.role = role;
        const insertUser = await userService.insertUser(user);
        const token = encrypt.generateToken({id: user.id});
        logger.info(`[${user.id}] - User created successfully`);
        delete user.password;
        return myResponse.sendSuccess(res, insertUser, "User created successfully", token);
    }

    static async getUsers(req: Request, res: Response) {
        const data = cache.get("data");
        const userService = new UserService();
        try {
            if (data) {
                return myResponse.sendSuccess(res, data);
            } else {
                const users = await userService.getAllUsers();
                cache.put("data", users, 6000);
                const usersWithoutPassword: Omit<User, 'password'>[] = users.map(({password, ...rest}) => ({
                    ...rest
                }));
                return myResponse.sendSuccess(res, usersWithoutPassword);
            }
        } catch (error) {
            return myResponse.sendInternalError(error);
        }
    }

    static async getUserById (request: Request, response: Response) {
        try {
            const userService = new UserService();
            const { id } = request.params;
            const user = await userService.getUserById(id);
            if (user) {
                delete user.password;
                return MyResponse.sendSuccess(response, user);
            } else {
                logger.error(`Usuário não encontrado: ${user.email}`);
                return MyResponse.sendNotFound(response);
            }
        } catch (error) {
            logger.error(error);
            return MyResponse.sendInternalError(response, error);
        }
    }

    static async updateUserById(req: Request, res: Response) {
        const userService = new UserService();
        const {id} = req.params;
        const {email, password, role} = req.body;
        const encryptedPassword = await encrypt.encryptPassword(password);
        const user = await userService.getUserById(id);
        user.email = email;
        user.password = encryptedPassword;
        user.role = role;
        await userService.updateUserById(id, user);
        delete user.password;
        logger.info(`[${id}] - Usuário atualizado com sucesso`)
        return myResponse.sendSuccess(res, user);
    }

    static async desableUserById (request: Request, response: Response) {
        try {
            const userService = new UserService();
            const { id, deletedAt, email } = request.params;
            const removedUser = await userService.desableUserById(id);
            if (deletedAt) {
                logger.error(`Usuário ${email} já desabilitado em ${deletedAt}`)
                return MyResponse.sendSuccess(response, { id, message: 'User already disabled.' });
            }
            logger.info(`[${id}] - Usuário já desabilitado.`)
            return MyResponse.sendSuccess(response, removedUser);
        } catch (error) {
            logger.error(error);
            return MyResponse.sendInternalError(response, error);
        }
    }

    static async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {id}});
        await userRepository.remove(user);
        res.status(200).json({message: "User deleted Successfully"});
    }
}