import express, { NextFunction, Request, Response } from 'express';
import "reflect-metadata"; 
import "dotenv/config";
import "express-async-errors";
import swaggerUi from 'swagger-ui-express';

import "./shared/container"
import { router } from './routes';
import swaggerFile from "./swagger.json"; 
import rateLimiter from "./middlewares/rateLimiter"
import { AppDataSource } from './data-source';
import { AppError } from './errors/AppError';

const app = express();

app.use(rateLimiter);

app.use(express.json());

AppDataSource.initialize().then(() => {    
    app.get('/', (req, res) => {
        return res.json('tudo certo')
    })
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    return res.status(500).json({
        status:"error",
        message:`Internal server error - ${err.message}`,
    })
})

export {app};