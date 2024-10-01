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
         id, username, email, avatar
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

export default{
    createUserRepository,
    findUserByEmailRepository
}

//https://learning.dnc.group/course/desenvolvedor-full-stack/player/145714/content/393327