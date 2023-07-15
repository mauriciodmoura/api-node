import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "varchar" })
    description: string

    @Column({ type: "numeric" })
    daily_rate: number

    @Column({ type: "boolean", default: true })
    available: boolean

    @Column({ type: "varchar" })
    license_plate: string

    @Column({ type: "numeric" })
    fine_amount: number
 
    @Column({ type: "varchar" })
    brand: string

    @Column({ type: "varchar" })
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }],
    })
    specifications: Specification[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}