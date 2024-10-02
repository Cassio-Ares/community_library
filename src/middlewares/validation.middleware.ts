import {Request, Response, NextFunction} from 'express'
import {ZodSchema, ZodError} from 'zod'
import { userIdSchema } from '../schema/user.schema'

export const validate = (schema:ZodSchema)=> (req:Request, res:Response, next:NextFunction)=> {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if(error instanceof ZodError){
             res.status(400).json({errors: error.errors})
        } 
    }

}

export const validateUserId = (req:Request, res:Response, next:NextFunction) =>{
   try {
    const userId = Number(req.params.id)
    userIdSchema.parse({userId: userId})
    next()
   } catch (error) {
    if(error instanceof ZodError){
        res.status(400).json({errors: error.errors})
   } 
   }
}