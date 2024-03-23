import { Request, Response } from "express";
import MyResponse from "../functions/MyResponse";
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

const desableUserById = async (request: Request, response: Response) => {
    try {
        const { id, deletedAt, email } = request.params;
        const removedUser = await userService.desableUserById(id);
        if (deletedAt) {
            logger.error(`Usuário ${email} já removido em ${deletedAt}`)
            return MyResponse.sendSuccess(response, { id, message: 'Usuário já removido.' });
        }
        return MyResponse.sendSuccess(response, removedUser);
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const UserController = {
    insertUser,
    updateUserById,
    desableUserById,
    getAllUsers,
    getUserById,
}

export default UserController;