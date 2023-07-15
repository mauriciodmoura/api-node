import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../src/modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "../../src/modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

import { ensureAdmin } from "../../src/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../../src/middlewares/ensureAuthenticated";
import { UploadCarImagesController } from "../modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import uploadConfig from "../config/upload";

const upload = multer(uploadConfig);

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)

export { carsRoutes }