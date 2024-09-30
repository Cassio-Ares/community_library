import userRepositories, { User } from "../repositories/user.repositories";

//responsavel pelo logica 
                                       

async function createUserService(newUser:User):Promise<{id:number; user:User}>{
    const user = await userRepositories.createUserRepository(newUser)
    return user;
}

export default{
    createUserService
}