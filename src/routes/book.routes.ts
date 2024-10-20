import { Router } from "express";
import bookController from "../controller/book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate, validateBookId } from "../middlewares/validation.middleware";
import { bookSchema } from "../schema/book.schema";



const routersBooks = Router()

routersBooks.post("/books", authMiddleware, validate(bookSchema),bookController.createBookController)
routersBooks.get("/books/search", bookController.searchBookController) //http://localhost:3000/books/search?search=a arte da guerra
routersBooks.get("/books", bookController.finAllBooksController)
routersBooks.get("/books/:id",validateBookId , bookController.findBookByIdController )
routersBooks.patch("/books/:id", authMiddleware,validateBookId, bookController.updateBookController)
routersBooks.delete("/books/:id", authMiddleware, validateBookId, bookController.deleteBookController)

export default routersBooks