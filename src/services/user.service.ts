import {myDataSource} from "../configs/app-data-source";
import {User} from "../entity/user.entity";
import logger from "../../src/configs/logger";

class UserService {
    private repository = myDataSource.getRepository(User);

    async getAllUsers() {
        return await this.repository.find();
    }

    async getUserById(id: string){
        return await this.repository.findOne({where: {id: id}})
    }

    async insertUser(userData: any){
        return await this.repository.save(userData);
    }

    async updateUserById(id: string, updatedUserData: any) {
        const user = await this.repository.findOne({where: {id: id}});
        if(!user){
            logger.info("Usuário não encontrado");
            throw new Error("Usuário não encontrado");
        }
        const updatedUser = this.repository.merge(user, updatedUserData);
        return await this.repository.save(updatedUser);
    }

    async  desableUserById(id: string){
        const user = await this.repository.findOneBy( {id});
        if(!user){
            logger.info("Usuário não encontrado");
            throw new Error("Usuário não encontrado");
        }

        user.deletedAt = new Date();
        logger.info(`Usuário (${user.email}) removido com sucesso!`);
        return await this.repository.save(user);
    }
}

export default UserService;