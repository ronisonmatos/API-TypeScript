import { NextFunction, Request, Response } from "express";
import { myDataSource } from "../configs/app-data-source";
import { User } from "../entity/user.entity";
import MyResponse from "../functions/MyResponse";
import { IsNull } from "typeorm";
import logger from "../../src/configs/logger";
import UserService from "../services/user.service";

const userService = new UserService();

const getAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await userService.getAllUsers();
        logger.info("Consulta de todos os Usuários com sucesso.")
        return MyResponse.sendSuccess(response, users);
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const getUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { auth } = request.body;
        const user = await userService.getUserById(id);
        if (user) {
            logger.info("Consulta de usuário por ID com sucesso.");
            return MyResponse.sendSuccess(response, user);
        } else {
            logger.error("Usuário não encontrado.");
            return MyResponse.sendNotFound(response);
        }
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const insertUser = async (request: Request, response: Response) => {
    try {
        const userData = request.body;
        const insertedUser = await userService.insertUser(userData)
        //const token = jwt.sign({ user: data.id });
        //const parsed = {
            //user: user,
            //token: token,
        //};
        logger.info(`Inserção do usuário ${userData.email} com sucesso.`);
        return MyResponse.sendSuccess(response, insertedUser);
    } catch (error) {
        logger.error(error)
        return MyResponse.sendInternalError(response, error);
    }
}

const updateUserById = async (request: Request, response: Response) => {
    try {
        const { id, email } = request.params;
        const updatedDeviceData = request.body;
        const updatedUser = await userService.updateUserById(id, updatedDeviceData)
        logger.info(`Atualização do usuário (${email}) com sucesso.`);
        return MyResponse.sendSuccess(response, updatedUser);
    } catch (error) {
        logger.error(error)
        return MyResponse.sendInternalError(response, error);
    }
}

const removeUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const repository = myDataSource.getRepository(User);
        const user = await repository.findOneBy({ id });

        if (!user) {
            logger.info(`Usuário ID: ${id} não encontrado.`)
            return MyResponse.sendNotFound(response);
        }

        if (user.deletedAt) {
            logger.error(`Usuário ${user.email} já removido em ${user.deletedAt}`)
            return MyResponse.sendSuccess(response, { id, message: 'Usuário já removido.' });
        }

        user.deletedAt = new Date();
        await repository.save(user);
        logger.info(`Usuário (${user.email}) removido com sucesso!`);

        return MyResponse.sendSuccess(response, { id });
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const UserController = {
    insertUser,
    updateUserById,
    removeUserById,
    getAllUsers,
    getUserById,
}

export default UserController;