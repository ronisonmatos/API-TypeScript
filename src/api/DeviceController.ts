import {Request, Response} from "express";
import MyResponse from "../functions/MyResponse";
import logger from "../../src/configs/logger";
import DeviceService from "../services/device.service";

const deviceService = new DeviceService();

const getAllDevices = async (request: Request, response: Response) => {
    try {
        const devices = await deviceService.getAllDevices();
        logger.info("Consulta de todos os dispositivos com sucesso.");
        return MyResponse.sendSuccess(response, devices);
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
};

const getDeviceById = async (request: Request, response: Response) => {
    try {
        const {id} = request.params;
        const device = await deviceService.getDeviceById(id);
        if (device) {
            logger.info("Consulta de dispositivo por ID com sucesso.");
            return MyResponse.sendSuccess(response, device);
        } else {
            logger.error("Dispositivo não encontrado.");
            return MyResponse.sendNotFound(response);
        }
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
};

const insertDevice = async (request: Request, response: Response) => {
    try {
        const deviceData = request.body;
        const insertedDevice = await deviceService.insertDevice(deviceData);
        logger.info("Inserção de dispositivo com sucesso.");
        return MyResponse.sendSuccess(response, insertedDevice);
    } catch (error) {
        logger.error(`Erro ao inserir dispositivo: ${error}`);
        return MyResponse.sendInternalError(response, error);
    }
};

const updateDeviceById = async (request: Request, response: Response) => {
    try {
        const {id} = request.params;
        const updatedDeviceData = request.body;
        const updatedDevice = await deviceService.updateDeviceById(id, updatedDeviceData);
        logger.info("Atualização de dispositivo com sucesso.");
        return MyResponse.sendSuccess(response, updatedDevice);
    } catch (error) {
        logger.error(error);
        return MyResponse.sendInternalError(response, error);
    }
};

const DeviceController = {
    getAllDevices,
    getDeviceById,
    insertDevice,
    updateDeviceById,
};

export default DeviceController;