import { Request, Response } from 'express';
import userServices from '../service/user.services';

// Responsável por receber uma requisição e dar uma resposta
async function createUserController(req: Request, res: Response): Promise<void> {
    const newUser = req.body;

    try {
        const user = await userServices.createUserService(newUser); // Aqui usamos await para esperar a Promise resolver
        res.status(201).send({ user });
    } catch (error: any) { // Aqui tipamos o erro como any para capturar qualquer tipo de erro
        res.status(400).send(error.message);
    }
}

async function findAllUserController(req:Request, res:Response):Promise<void> {
    try {
       const users =  await userServices.findAllUserService()
       res.status(200).send({users})
    } catch (error:any) {
        res.status(400).send(error.message);
    }
}

async function findUserByIdController(req:Request, res:Response):Promise<void> {
    const {id} = req.params
    try {
      const user = await userServices.findUserByIdService(Number(id))  
   
    res.status(200).send({user})
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

async function  updataUserController(req:Request, res:Response):Promise<void> {
    const {id} = req.params
    const user = req.body

    try {
        const userUpdat = await userServices.updateUserService(Number(id), user)

        res.status(200).send({userUpdat})
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

async function deleteUserController(req:Request, res:Response):Promise<void> {
    const {id} = req.params

    try {
        const userDelet = await userServices.deleteUserService(Number(id))

        res.status(200).send({userDelet})
    } catch (error:any) {
      res.status(400).send(error.message)
    }
}

export default {
    createUserController,
    findAllUserController,
    findUserByIdController,
    updataUserController,
    deleteUserController
};

