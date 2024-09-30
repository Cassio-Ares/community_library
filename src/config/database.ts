import sqlite3  from "sqlite3";

export const db = new sqlite3.Database('library_db.sqlite', (err: Error | null)=>{
    if(err){
        console.error(`Erro ao conectar no banco de dados: ${err.message}`)
    }else{
        console.log('Conectado com sucesso ao banco de dados Sqlite')
    }
});

export function closeDb(){
    db.close((err:Error | null)=>{
        if(err){
            console.error(`Erro ao fechar o banco de dados: ${err.message}`)
        }else{
            console.log('Conexão fechada com sucesso.')
        }
    })
}