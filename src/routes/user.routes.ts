import { Router } from "express";
import userController from "../controller/user.controller";

//validate and middlewares
import { validate, validateUserId } from "../middlewares/validation.middleware";
import { userSchema } from "../schema/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";



const routerUsers = Router()

routerUsers.post('/users',validate(userSchema), userController.createUserController)
routerUsers.post('/users/login', userController.loginController)
routerUsers.get('/users', authMiddleware ,userController.findAllUserController)
routerUsers.get('/users/:id', authMiddleware,validateUserId, userController.findUserByIdController)
// routerUsers.put('/users/:id',validateUserId,validate(userSchema), userController.updataUserController)
routerUsers.patch('/users/:id',authMiddleware,validateUserId, userController.updataUserController)
routerUsers.delete('/users/:id', authMiddleware,validateUserId, userController.deleteUserController)


export default routerUsers

