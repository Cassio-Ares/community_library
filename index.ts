import express from 'express';
import routersUser from './src/routes/user.routes';
import dotenv from 'dotenv'
import routersBooks from './src/routes/book.routes';
import routersLoans from './src/routes/loans.routes';

const app = express()
dotenv.config()

const PORT = 3000


app.use(express.json())

app.use(routersUser)
app.use(routersBooks)
app.use(routersLoans)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

/**
 * Install
 * 
 * npm init -y
 * 
 * npm install --save-dev typescript @types/node ts-node
 * 
 * npm install express
 * 
 * npm install --save-dev @types/express
 * 
 * npm --save-dev ts-node-dev 
 *    (é o nodemon do typescript)
 * 
 * npx tsc --init
 */

