import { Request, Response } from "express";
import { myDataSource } from "../configs/app-data-source";
import { City } from "../entity/city.entity";
import MyResponse from "../functions/MyResponse";
import { IsNull } from "typeorm";

const getAll = async (request: Request, response: Response) => {
    try {
        const repository = myDataSource.getRepository(City);
        const data = await repository.find({
            where: { deletedAt: IsNull() }
        });
        return MyResponse.sendSuccess(response, data);
    } catch (error) {
        console.log(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const get = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const repository = myDataSource.getRepository(City);

        const city = await repository.findOne({
            where: { id: Number(id) } 
        });

        if (city) {
            return MyResponse.sendSuccess(response, city);
        } else {
            return MyResponse.sendNotFound(response);
        }
    } catch (error) {
        console.log(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const insert = async (request: Request, response: Response) => {
    try {
        const repository = myDataSource.getRepository(City);
        const city = request.body;
        const data = await repository.save(city);
        const parsed = {
            city: city,
        };
        return MyResponse.sendSuccess(response, parsed);
    } catch (error) {
        console.log(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const update = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { auth, ...updated } = request.body;
        const repository = myDataSource.getRepository(City);
        const city = await repository.findOne({
            where: { id: Number(id) }
        });

        if (!city) {
            return MyResponse.sendNotFound(response);
        }

        const save = repository.merge(city, updated);
        const data = await repository.save(save);
        return MyResponse.sendSuccess(response, data);
    } catch (error) {
        console.log(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const remove = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const repository = myDataSource.getRepository(City);

        const city = await repository.findOne({
            where: { id: Number(id) },
        });

        if (city) {
            if (!city.deletedAt || city.deletedAt === null) {
                city.deletedAt = new Date();
                await repository.save(city);
                return MyResponse.sendSuccess(response, { id: id });
            }
        }

        return MyResponse.sendNotFound(response);
    } catch (error) {
        console.log(error);
        return MyResponse.sendInternalError(response, error);
    }
}

const CityController = {
    insert,
    update,
    remove,
    getAll,
    get,
}

export default CityController;