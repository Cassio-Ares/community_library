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

export default {
    createUserController,
};