import { db } from "../config/database";

db.run(`
    CREATE TABLE IF NOT EXISTS books(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT NULL,
     author TEXT NOT NULL,
     userId INTEGER,
     FOREIGN KEY (userId) REFERENCES user(id)
 )
 `);

 export interface Books{
    id:number,
    title:string,
    author:string,
    userId: number
 }

 type BookRow = Books | undefined 

 function createBookRepository(newBook: Omit<Books, 'id' | 'userId'>, userId: number): Promise<Books> {
    return new Promise((res, rej) => {
        const { title, author } = newBook;
        db.run(`
            INSERT INTO books (title, author, userId) 
            VALUES (?, ?, ?)
        `, [title, author, userId], function (err: any) {
            if (err) {
                rej(err);
            } else {
                res({
                    id: this.lastID,
                    title,
                    author,
                    userId
                });
            }
        });
    });
}

function findAllBooksRepository():Promise<Books[]>{
    return new Promise((res, rej)=>{
        db.all(`
            SELECT * FROM books
         `, [], (err:any, rows:Books[])=>{
            if(err){
                rej(err)
            }else{
                res(rows)
            }
         })
    })
}


function findBooksByIdRepository(bookId:number):Promise<Books | null>{
  return new Promise((res, rej)=>{
    db.get(`
      SELECT * 
      FROM books
      WHERE id = ?
    `,[bookId], (err:any, row:BookRow)=>{
        if(err){
            rej(err)
        }else{
            res(row || null)
        }
    })
  })
}

function updateBookRepository(bookId:number, updateBook:Partial<Books>):Promise<Books>{
  return new Promise((res, rej)=>{
    const fields:Array<keyof Books> = ['title', 'author', 'userId']

    let query = "UPDATE books SET "
    const values = []

    fields.forEach((field)=>{
        if(updateBook[field] != undefined){
            query += `${field} = ? ,`
            values.push(updateBook[field])
        }
    })

    query = query.slice(0 , -1)

    query += " where id = ?"

    values.push(Number(bookId))


    db.run(query, values, (err:any)=>{
        if(err){
            rej(err)
        }else{
            res({
                ...updateBook, 
                id:bookId
            }as Books)
        }
    })
  })
}

function deleteBookRepository(bookId:number):Promise<{message:string, bookId:number}>{
  return new Promise((res, rej)=>{
    db.run(`
     DELETE 
     FROM books
     WHERE id = ?
    `, [bookId], (err:any)=>{
        if(err){
            rej(err)
        }else{
            res({
                message: "Book deleted successfully", bookId
            })
        }
    })
  })
}

/**
 * query sql:
 * SELECIONE *(tudo)
 * DE ONDE book
 * ONDE title TENHA VALORES SIMILARES A ? OU author TENHA VALORES SIMILARES A ?
 * 
 * [% É UM ELEMENTO CURINGA QUE SIG "QUALQUER SEQUÊNCIA DE CARACTER %" ]
 * @param search busca desde uma letra até palavaras ou frases inteiras
 * @returns lista de books 
 */
function searchBooksRepository(search:string):Promise<Books[]>{
  return new Promise((res, rej)=>{
    db.all(`
         SELECT *
         FROM books
         WHERE title LIKE ? OR author LIKE ?
    `, [`%${search}%`, `%${search}%`], (err:any, rows:Books[])=>{
        if(err){
            rej(err)
        }else{ 
            res(rows)
        }
    })
  })
}


 export default {
    createBookRepository,
    findAllBooksRepository,
    findBooksByIdRepository, 
    updateBookRepository,
    deleteBookRepository,
    searchBooksRepository
 }

