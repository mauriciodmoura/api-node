import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Specification } from "./Specification";
import { Car } from "./Car";

@Entity('specifications_cars')
export class SpecificationCars {
    @PrimaryGeneratedColumn('uuid')
    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car_id: Car;

    @ManyToOne(() => Specification)
    @JoinColumn({ name: "specification_id" })
    specification_id: Specification;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date
    
}