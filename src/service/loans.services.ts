import loanRepositories, { Loans } from "../repositories/loan.repositories";

async function createLoanService(userid:number, bookId:number, dueDate:Date):Promise<Loans> {
     const createLoans = await loanRepositories.createLoanRepository(userid, bookId, dueDate)
     if(!createLoans) throw new Error("Error creating loans")
    return createLoans
}

async function findAllLoansService():Promise<Loans[] | []> {
    const loans = await loanRepositories.findAllLoansRepository()
    return loans
}

async function findLoansByIdService(loanId:number):Promise<Loans | null> {
    const loan = await loanRepositories.findLoanByIdRepository(loanId)
    if(!loan) throw new Error("Loan not found")
    return loan
}


async function deleteLoansService(loanId:number, userId:number):Promise<{message:string}> {
   const loan = await loanRepositories.findLoanByIdRepository(loanId)
   if(!loan) throw new Error("Loan not found")
    if(loan.userId != userId) throw new Error("Unauthorized")

    const response = await loanRepositories.deleteLoanRepository(loanId)

    return response
}


export default{
    createLoanService,
    findAllLoansService,
    findLoansByIdService,
    deleteLoansService
}