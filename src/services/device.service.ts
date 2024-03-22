import {myDataSource} from "../configs/app-data-source";
import {Device} from "../entity/device.entity";

class DeviceService {
    private repository = myDataSource.getRepository(Device);

    async getAllDevices() {
        return await this.repository.find();
    }

    async getDeviceById(id: string) {
        return await this.repository.findOne({where: {id: id}});
    }

    async insertDevice(deviceData: any) {
        return await this.repository.save(deviceData);
    }

    async updateDeviceById(id: string, updatedDeviceData: any) {
        const device = await this.repository.findOne({where: {id: id}});
        if (!device) {
            throw new Error("Dispositivo não encontrado");
        }
        const updatedDevice = this.repository.merge(device, updatedDeviceData);
        return await this.repository.save(updatedDevice);
    }
}

export default DeviceService;