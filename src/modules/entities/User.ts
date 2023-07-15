import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "varchar" })
    email: string

    @Column({ type: "varchar" })
    password: string

    @Column({ type: "varchar" })
    driver_license: string

    @Column({ type: "boolean", default: false })
    isAdmin: boolean

    @Column({ type: "varchar", nullable: true })
    avatar: string | null

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.isAdmin = false;
        this.avatar = null;
    }
}
