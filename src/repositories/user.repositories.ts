import { db } from "../config/database";

/**
 * repositories:
 * 
 * Responsável por conectar com banco de dados e fazer as requisições: Create, Insert into, select, update, delete
 */

//cria a tabela users
db.run(`
    CREATE TABLE IF NOT EXISTS users(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT NOT NULL, 
     email  TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL, 
     avatar TEXT
    )
    `);

//interface para novo usuario
export interface User{
    id:number,
    username: string, 
    email: string, 
    password: string,
    avatar?: string
}

//função para criar um novo usuario
// Omit<User, 'id'> para indicar que o id não é necessário na criação

function createUserRepository(newUser:Omit<User, 'id'>):Promise<User>{
    // Desestruturando os dados do novo usuário
    const {username, email, password, avatar} = newUser
    return new Promise((res, rej)=>{
        db.run(`
            INSERT INTO users (username, email, password, avatar)
            VALUES(?,?,?,?)
        `, [username, email, password, avatar], function(err:Error | null){
           if(err){
            rej(err)
           }else{
            res({
                id: this.lastID,
                username, 
                email, 
                password, 
                avatar
            });
           }
        })
    })
};

type UserRow = User | undefined;

function findUserByEmailRepository(email:string):Promise<User | null>{
   return new Promise((res, rej)=>{
    db.get(`
        SELECT
         id, username, email, password, avatar
         FROM users
         WHERE email = ?
     `, [email], (err, row:UserRow)=>{
        if(err){
            rej(err)
        }else{
            res(row || null)
        }
     })
   })
}


function findUserByIdRepository(id:number):Promise<User | null>{
    return new Promise((res, rej)=>{
        db.get(`
          SELECT
            id, username, email, avatar
          FROM users
          WHERE id = ?
        `, [id], (error, row:UserRow)=>{
            if(error){
                rej(error)
            }else{
                res(row || null)
            }
        })
    })
}

function findAllUserRepository():Promise<User | []>{
    return new Promise((res, rej)=>{
        db.all(`
            SELECT
              id, username, email, avatar
            FROM users
        `,[], (error:any, rows:UserRow)=>{
            if(error){
                rej(error)
            }else{
                res(rows || [])
            }
        })
    })
}


// função para usar em put 

// function updateUserRepository(id:number, user:Partial<User>):Promise<User>{
//     const {username, email, password, avatar} = user 
//   return new Promise((res, rej)=>{
//     db.run(`
//         UPDATE users
//         SET username = ?, email = ?, password = ?, avatar = ?  
//         WHERE id = ?
//         `,[username, email, password, avatar, id], (err)=>{
//             if(err){
//                 rej(err)
//             }else{
//                 res({
//                     id,
//                     username: username || '',
//                     email: email || '',
//                     password: password || '',
//                     avatar: avatar || ''
//                 })
//             }
//         })
//   })
// }


// montando a query sql de forma dinamica 
function  updateUserRepository(id:number, user:Partial<User>):Promise<User>{
   return new Promise((res, rej)=>{
    const fields:Array<keyof User>= ['username', 'email', 'password', 'avatar']
    const values = []

    let query = "UPDATE users SET"

    fields.forEach((field, index)=>{
        if(user[field] !== undefined){
          query += ` ${field} = ? ,`
          values.push(user[field])
        }
    })


    query = query.slice(0, -1)// Remove a última vírgula
    
    query += " WHERE id = ?"

    values.push(Number(id))

    
    db.run(query, values, (err)=>{
        if(err){
            rej(err)
        } else {
            res({
                ...user,
                id: id 
            } as User);
        }
    })
   })
}

function deleteUserRepository(id:number):Promise<{message:string, id:number}>{
    return new Promise((res, rej)=>{
        db.run(`
         DELETE FROM users
         WHERE id = ?
        `, [id], (err)=>{
            if(err){
                rej(err)
            }else{
                res({message: "User deleted successfully", id})
            }
        })
    })
}

export default{
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUserRepository,
    updateUserRepository,
    deleteUserRepository
}
