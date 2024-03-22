import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import * as dotenv from "dotenv"
import {format} from 'date-fns';

export enum DeviceTypes {
    IOS,
    ANDROID,
    WEB
}

@Entity()
export class Device {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: DeviceTypes,
        default: DeviceTypes.WEB
    })
    type: DeviceTypes;

    @Column()
    notificationToken: string;

    @Column()
    userId: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(3)",
        transformer: {
            to: () => new Date(),
            from: (value: string) => format(new Date(value), process.env.TIME_ZONE)
        }
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(3)",
        onUpdate: "CURRENT_TIMESTAMP(3)",
        transformer: {
            to: () => new Date(),
            from: (value: string) => format(new Date(value), process.env.TIME_ZONE)
        }
    })
    updatedAt: Date;
}
