import { Request, Response } from "express"
import { container } from "tsyringe"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


class SendForgotPasswordMailController {
    async handle(req: Request, res: Response): Promise<Response> {
        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase)

        return res.send();
    }
}

export { SendForgotPasswordMailController }