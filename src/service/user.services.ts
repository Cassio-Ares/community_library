import userRepositories, { User } from "../repositories/user.repositories";
import bcrypt from 'bcrypt'

//responsavel pelo logica 
                                       

async function createUserService(newUser:User):Promise<User>{
    const foundUser = await userRepositories.findUserByEmailRepository(newUser.email)
    if(foundUser) throw new Error("User already exists")

    const salt = await bcrypt.genSalt(10)// proteção contra "rainbow table", onde o atacante tenta pré-calcular hashes de senhas comuns.
    
    const passCrypt = await bcrypt.hash(newUser.password, salt)

    const user = await userRepositories.createUserRepository({...newUser, password:passCrypt})
    if(!user) throw new Error("Error creating User")
    return user;
}

export default{
    createUserService
}