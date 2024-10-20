import bookRepositories, { Books } from "../repositories/book.repositories";


async function createBookService(newBook:Books, userId:number):Promise<Books> {
    
    const createBook = await bookRepositories.createBookRepository(
        newBook,
        userId
    )

    if(!createBook) throw new Error ("Error creatiang book")

   return createBook
}

async function findAllBooksService():Promise<Books[]> {
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

async function searchBooksService(search:string):Promise<Books[]> {
    //se o usuario não colocar nada no "search" ele recebe a lista completa de livros
    if(!search) return await bookRepositories.findAllBooksRepository() 

    const books = await bookRepositories.searchBooksRepository(search)
    return books
}





export default{
    createBookService,
    findAllBooksService,
    findBookByIdService,
    updateBookService,
    deleteBookService,
    searchBooksService
}