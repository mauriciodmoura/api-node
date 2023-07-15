import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../../../modules/entities/Car";
import { usersRoutes } from "../../../../../src/routes/users.routes";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {  
    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
      
        Object.assign(car, {
          name,
          description,
          daily_rate,
          license_plate,
          fine_amount,
          brand,
          category_id,
          available: true,
          created_at: new Date(),
        });
      
        this.cars.push(car);
      
        return car;
      }

      async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
      }
    
      async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
      ): Promise<Car[]> {
        let availableCars = this.cars.filter((car) => car.available);
    
        if (!name && !brand && !category_id) return availableCars;
    
        availableCars = availableCars.filter((car) => {
          if (car.name === name) return true;
          if (car.brand === brand) return true;
          if (car.category_id === category_id) return true;
    
          return false;
        });
    
        return availableCars;
      }

      async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
      }
    
      async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
    }
    
    export { CarsRepositoryInMemory };