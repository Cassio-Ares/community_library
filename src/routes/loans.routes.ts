import {Router} from 'express'
import loansController from '../controller/loans.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate, validateLoansId } from '../middlewares/validation.middleware';
import { loanSchema } from '../schema/loan.schema';



const routersLoans = Router()

routersLoans.post('/loans', authMiddleware, validate(loanSchema),loansController.createLoanController)
routersLoans.get('/loans', authMiddleware, loansController.findAllLoansController)
routersLoans.get('/loans/:id', authMiddleware, validateLoansId, loansController.findLoanByIdController)
routersLoans.delete('/loans/:id', authMiddleware, validateLoansId ,loansController.deleteLoanController)



export default routersLoans;