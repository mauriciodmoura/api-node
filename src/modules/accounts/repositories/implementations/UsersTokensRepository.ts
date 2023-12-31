import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { UserTokens } from "../../../../modules/entities/UserTokens";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
      }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
          expires_date,
          refresh_token,
          user_id,
        });
    
        await this.repository.save(userToken);
    
        return userToken;
      }
    
      async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
      ): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({
            where: {
                user_id,
                refresh_token,
              },
        });
        return usersTokens;
      }
    
      async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
      }
    
      async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOne({ 
            where: {
                refresh_token,
            },
        });
    
        return userToken;
      }
    }
    
    export { UsersTokensRepository };