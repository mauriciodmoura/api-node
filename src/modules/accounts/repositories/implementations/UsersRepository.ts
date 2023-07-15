import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { User } from "../../../entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({ name, email, driver_license, password, avatar, id, }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,            
            email,
            driver_license,
            password,
            avatar,
            id,
        });

        await this.repository.save(user);
    }    

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: { email }
        });
        return user;
    }

    async findByName(name: string): Promise<User> {
        const user = this.repository.findOne({
            where: { name }
        });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: { id }
        });
        return user;
    }
}

export { UsersRepository };