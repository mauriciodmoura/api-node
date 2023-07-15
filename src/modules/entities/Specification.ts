import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('specifications')
export class Specification {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({type: "varchar"})
    name: string

    @Column({type: "varchar"})
    description: string

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}