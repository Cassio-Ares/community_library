import express from 'express';

const app = express()

const PORT = 3000

app.use(express.json())
app.get('/', (_, res)=>{
    res.send('Hello World')
})

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