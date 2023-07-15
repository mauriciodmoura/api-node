import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Car } from "src/modules/entities/Car";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);
  
    if (!carExists) {
      throw new AppError("Car does not exist!");
    }
  
    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );
  
    carExists.specifications = specifications;
  

  
    return carExists;
  }
}


export {CreateCarSpecificationUseCase};