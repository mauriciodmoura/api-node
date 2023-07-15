import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cars_image')
export class CarImage {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "varchar"})
    car_id: string

    @Column({type: "varchar"})
    image_name: string

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

