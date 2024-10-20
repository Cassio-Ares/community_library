import express from 'express';
import dotenv from 'dotenv'
import router from './src/routes';
import  './src/service/cron-service'

const app = express()
dotenv.config()

const PORT = 3000


app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

