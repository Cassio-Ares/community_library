import { Router } from "express";
import userController from "../controller/user.controller";

const routerUsers = Router()

routerUsers.post('/users', userController.createUserController)

export default routerUsers