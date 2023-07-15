import { container } from "tsyringe";
import "reflect-metadata"; 

import "../../shared/container/providers"

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { CarsRepository } from "../../modules/cars/repositories/implementations/CarsRepository";
import { CarsImagesRepository } from "../../modules/cars/repositories/implementations/CarsImagesRepository";
import { RentalsRepository } from "../../modules/rentals/repositories/implementations/RentalsRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "../../modules/accounts/repositories/implementations/UsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.register("SpecificationsRepository", SpecificationRepository);

container.register("UsersRepository", UsersRepository);

container.register("CarsRepository", CarsRepository);

container.register("CarsImagesRepository", CarsImagesRepository);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository
  );

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository
  );