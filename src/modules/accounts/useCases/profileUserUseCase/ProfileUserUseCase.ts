import { User } from "../../../../modules/entities/User";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";


@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);
        return user;
    }
}

export {ProfileUserUseCase}