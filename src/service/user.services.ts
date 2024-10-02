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

async function findAllUserService():Promise<User | []> {
    const users = await userRepositories.findAllUserRepository();
    return users
}

async function findUserByIdService(id:number):Promise<User | null> {
    const user = await userRepositories.findUserByIdRepository(id)

    if(!user) throw new Error('User not found')

    return user
}

async function updateUserService(id:number, newUser:User):Promise<User> {
   const user = await userRepositories.findUserByIdRepository(Number(id))

   if(!user) throw new Error('User not found')

    if(newUser.password){
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
    }
   
    const userUpdated = userRepositories.updateUserRepository(id, newUser)

    return userUpdated
   
}

                                            
async function deleteUserService(id:number):Promise<{ message: string }> {
    const user = await userRepositories.findUserByIdRepository(Number(id))

    if(!user) throw new Error('User not found')

    const {message} = await userRepositories.deleteUserRepository(id)

    return {message}
}
export default{
    createUserService,
    findAllUserService,
    findUserByIdService,
    updateUserService,
    deleteUserService
}