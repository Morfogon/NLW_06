import { getCustomRepository } from "typeorm";
import User from "../entities/User"
import UsersRepositories from "../database/repositories/UsersRepositories"

interface IUserRequest{
    name:string;
    email:string;
    admin?:boolean;
}

class CreateUserService{
    async execute({name, email, admin}:IUserRequest): Promise<User> {
        console.log({name, email, admin})
        const usersRepositoriy = getCustomRepository(UsersRepositories);

        if(!email){
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepositoriy.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const user = usersRepositoriy.create({name,email,admin});

        await usersRepositoriy.save(user);

        return user;
    }
}

export {CreateUserService}