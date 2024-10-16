import {Request, Response, NextFunction} from 'express'
import {ZodSchema, ZodError} from 'zod'
import { userIdSchema } from '../schema/user.schema'
import { bookIdSchema } from '../schema/book.schema'

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

export const validateBookId = (req:Request, res:Response, next:NextFunction) =>{
    try {
        bookIdSchema.parse({bookId: +req.params.id}) //colocar + na frente é basicamente o mesmo que Number() torna o elemento um numero
        next()
    } catch (err:any) {
        res.status(400).json({error:err.message})
    }
}