import { db } from "../config/database";

db.run(`
    CREATE TABLE IF NOT EXISTS loans(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      bookId INTEGER,
      dueDate DATE,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (bookId) REFERENCES books(id)
    )
`)

export interface Loans{
    id:number, 
    userId:number,
    bookId:number,
    dueDate: Date
}


function createLoanRepository(userId:number, bookId:number, dueDate:Date):Promise<Loans>{
  return new Promise((res, rej)=>{
    db.run(`
        INSERT INTO loans (userId, bookId, dueDate)
        VALUES (?,?,?)
    `, [userId, bookId, dueDate], function(err:any){
        if(err){
         rej(err)
        }else{
            res({
                id:this.lastID,
                userId, 
                bookId,
                dueDate
            })
        }
    })
  })
}

function findAllLoansRepository():Promise<Loans[] | []> {
    return new Promise((res, rej)=>{
        db.all(`
            SELECT *
            FROM loans
        `, [], (err:any, rows:Loans[])=>{
            if(err){
                rej(err)
            }else{
                res(rows || [])
            }
        })
    })
}

function findLoanByIdRepository(loanId:number):Promise<Loans | null>{
    return new Promise((res, rej)=>{
        db.get(`
            SELECT *
            FROM loans
            WHERE id = ?
        `, [loanId], (err:any, row:Loans)=>{
            if(err){
                rej(err)
            }else{
                res(row || null)
            }
        })
    })
}


function deleteLoanRepository(loanId:number):Promise<{message:string, id:number}>{
    return new Promise((res, rej)=>{
        db.run(`
            DELETE FROM loans 
            WHERE id = ?
        `, [loanId], (err:any)=>{
            if(err){
                rej(err)
            }else{
                res({message: "Loans deleted sucessfully", id:loanId})
            }
        })
    })
}

export default{
    createLoanRepository, 
    findAllLoansRepository, 
    findLoanByIdRepository, 
    deleteLoanRepository
}

