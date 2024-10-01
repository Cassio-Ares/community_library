import { Router } from "express";
import userController from "../controller/user.controller";

//validate and middlewares
import { validate } from "../middlewares/validation.middleware";
import { userSchema } from "../schema/user.schema";



const routerUsers = Router()

routerUsers.post('/users',validate(userSchema), userController.createUserController)

export default routerUsers