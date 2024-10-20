import {Response, Request} from 'express'
import loansServices from '../service/loans.services';


async function createLoanController(req:Request, res:Response):Promise<void> {
    try {
       const {bookId, dueDate} = req.body;
       const userId = req.userId

       if(typeof userId != 'number'){
        res.status(400).send('User ID is required and must be a number.');
        return
       }

       if(typeof bookId != 'number'){
        res.status(400).send('Book Id is required and must be a number.');
        return
       }

       const createLoan = await loansServices.createLoanService(userId, bookId, dueDate)

       res.status(201).send(createLoan)
   
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

async function findAllLoansController(req:Request, res:Response):Promise<void> {
    try {
       const loans = await loansServices.findAllLoansService()
       res.status(200).send(loans) 
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

async function findLoanByIdController(req:Request, res:Response):Promise<void> {
    try {
        const loanId = req.params.id
       
        const loans = await loansServices.findLoansByIdService(Number(loanId))
       
        res.status(200).send(loans)

    } catch (error:any) {
        res.status(400).send(error.message)
    }
}


async function deleteLoanController(req:Request, res:Response):Promise<void> {
    try {
        const loanId = req.params.id
        const userId = req.userId

        if(typeof userId != 'number'){
            res.status(400).send('User Id is required and must be a number.');
            return 
        }

        const loan = await loansServices.deleteLoansService(Number(loanId), userId)

        res.status(200).send(loan)
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

export default{
    createLoanController, 
    findAllLoansController,
    findLoanByIdController, 
    deleteLoanController
}