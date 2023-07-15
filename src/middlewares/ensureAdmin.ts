import { NextFunction, Request, Response } from "express";
import { AppError } from "../../src/errors/AppError";
import { UsersRepository } from "../../src/modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAdmin(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const {id} = req.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if(!user.isAdmin) {
        throw new AppError("User isn't admin!");
    }

    return next();
}