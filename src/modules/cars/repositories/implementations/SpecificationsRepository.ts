import { Repository, In } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Specification } from "../../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }


    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
    }    

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: { name }
        });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.find({
          where: { id: In(ids) },
        });
        return specifications;
      }
}

export { SpecificationRepository };
