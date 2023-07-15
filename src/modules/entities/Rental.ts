import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "./Car";
import { User } from "./User";
  
@Entity("rentals")
  class Rental {
    @PrimaryGeneratedColumn('uuid')
    id: string
  
    @Column('uuid')
    car_id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column('uuid')
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;
  
    @Column({ type: "timestamp", default: "now()" })
    start_date: Date;
  
    @Column({ type: "timestamp", nullable: true })
    end_date: Date;
  
    @Column({ type: "timestamp" })
    expected_return_date: Date;
  
    @Column({ type: "numeric", nullable: true })
    total: number;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
    fine_amount: any;
    daily_rate: any;
  
    constructor() {
      if (!this.id) {
        this.id = uuidV4();
      }
    }
  }

  export { Rental };  