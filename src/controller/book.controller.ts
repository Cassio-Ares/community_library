import { Request, Response } from "express";
import bookServices from "../service/book.services";

async function createBookController(req:Request, res:Response):Promise<void> {
    const newBook = req.body
    const userId = req.userId //pego na rota usando o middlewares de auth
    
    // Verifica se userId está presente
    if (typeof userId !== 'number') {
        res.status(400).send('User ID is required and must be a number.');
        return;
    }

    try {
        const createBook = await bookServices.createBookService(newBook, userId)
        res.status(201).send(createBook)
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

async function finAllBooksController(req:Request, res:Response):Promise<void> {
    try {
        const books = await bookServices.findAllBooksService()
        res.status(200).send(books)
    } catch (error:any) {
        res.status(404).send(error.message)
    }
}

async function findBookByIdController(req:Request, res:Response):Promise<void> {
    try {
        const bookId = req.params.id
        const book = await bookServices.findBookByIdService(Number(bookId))
        res.status(200).send(book)
    } catch (error:any) {
        res.status(400).send(error.message)
    }
}

async function updateBookController(req:Request, res:Response):Promise<void> {
    try {
        const bookId = req.params.id
        const userId = req.userId
        const updateBook = req.body

        if (typeof userId !== 'number') {
            res.status(400).send('User ID is required and must be a number.');
            return;
        }

        const response = await bookServices.updateBookService(Number(bookId), updateBook, userId)

        res.status(200).send(response)
    } catch (error:any) {
        res.status(404).send(error.message)
    }
}

async function deleteBookController(req:Request, res:Response):Promise<void> {
    try {
        const bookId = req.params.id
        const userId = req.userId

        if(typeof userId != 'number'){
            res.status(400).send('User ID is required and must be a number.');
            return
        }

        const response = await bookServices.deleteBookService(Number(bookId), userId)

        res.status(200).send(response)

    } catch (error:any) {
        res.status(404).send(error.message)
    }
}

async function searchBookController(req:Request, res:Response):Promise<void> {
    try {
         // Pega o parâmetro 'search' da query e converte para string, caso esteja presente
        const search = req.query.search?.toString() || "";

        const book = await bookServices.searchBooksService(search)

        res.status(200).send(book)
    } catch (error:any) {
         res.status(400).send(error.message)
    }
}


export default{
    createBookController,
    finAllBooksController,
    findBookByIdController, 
    updateBookController,
    deleteBookController,
    searchBookController
}