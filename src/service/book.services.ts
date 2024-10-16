import bookRepositories, { Books } from "../repositories/book.repositories";


async function createBookService(newBook:Books, userId:number):Promise<Books> {
    
    const createBook = await bookRepositories.createBookRepository(
        newBook,
        userId
    )

    if(!createBook) throw new Error ("Error creatiang book")

   return createBook
}

async function findAllBooksService():Promise<Books | []> {
    const books = await bookRepositories.findAllBooksRepository();
    return books
}

async function findBookByIdService(bookId:number):Promise<Books | null> {
    const book = await bookRepositories.findBooksByIdRepository(bookId)
    if(!book) throw new Error("Book not found")

    return book

} 


async function updateBookService(bookId:number, updateBook:Partial<Books>, userId:number) {
   const book = await bookRepositories.findBooksByIdRepository(bookId)
   if(!book) throw new Error("Book not found")

   if(book.userId != userId) throw new Error("Unauthorized")

   const response = await bookRepositories.updateBookRepository(bookId, updateBook)

   return response
}


async function deleteBookService(bookId:number, userId:number) {
    const book = await bookRepositories.findBooksByIdRepository(bookId)
    if(!book) throw new Error("Book not found")
    
    if(book.userId != userId) throw new Error("Unauthorized")

    const response = await bookRepositories.deleteBookRepository(bookId)

    return response
}

export default{
    createBookService,
    findAllBooksService,
    findBookByIdService,
    updateBookService,
    deleteBookService
}