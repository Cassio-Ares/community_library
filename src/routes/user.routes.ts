import { Router } from "express";
import userController from "../controller/user.controller";

//validate and middlewares
import { validate, validateUserId } from "../middlewares/validation.middleware";
import { userSchema } from "../schema/user.schema";



const routerUsers = Router()

routerUsers.post('/users',validate(userSchema), userController.createUserController)
routerUsers.post('/users/login', userController.loginController)
routerUsers.get('/users', userController.findAllUserController)
routerUsers.get('/users/:id',validateUserId, userController.findUserByIdController)
// routerUsers.put('/users/:id',validateUserId,validate(userSchema), userController.updataUserController)
routerUsers.patch('/users/:id',validateUserId, userController.updataUserController)
routerUsers.delete('/users/:id', validateUserId, userController.deleteUserController)


export default routerUsers