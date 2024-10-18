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

export interface AllLoans{ 
    id:number, 
    usersEmail:string,
    bookTitle:string,
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

// function findAllLoansRepository():Promise<Loans[] | []> {
//     return new Promise((res, rej)=>{
//         db.all(`
//             SELECT *
//             FROM loans
//         `, [], (err:any, rows:Loans[])=>{
//             if(err){
//                 rej(err)
//             }else{
//                 res(rows || [])
//             }
//         })
//     })
// }


/**
 * Esta query retorna os detalhes dos empréstimos de livros,
 * incluindo o ID do empréstimo, a data de vencimento, o e-mail do usuário
 * que realizou o empréstimo e o título do livro emprestado.
 * Ela realiza junções entre as tabelas de empréstimos, usuários e livros para obter essas informações.
 * 
 * explicação do join:
 *      JOIN user ON loans.userId = users.id 
 *      Junte a tabela users com a tabela loans onde o campo userId da tabela loans for igual ao campo id da tabela users.
 *  [
 *    {
 *      "id": 2,
 *      "dueDate": "2024-10-19",
 *      "email": "Te@Teste.com",
 *      "title": "A arte da Guerra"
 *     }
 *  ]
 */

function findAllLoansRepository():Promise<AllLoans[] | []>{
    return new Promise((res, rej)=>{
         db.all(`
         SELECT loans.id, loans.dueDate, users.email, books.title
         FROM loans
         JOIN users ON loans.userId = users.id   
         JOIN books ON loans.bookId = books.id
        `, [], (error:any, rows: AllLoans[])=>{
            if(error){
                rej(error)
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

