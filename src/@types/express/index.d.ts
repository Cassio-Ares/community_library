import 'express'

declare module 'express-serve-static-core'{
    interface Response{
        userId?:number
    }
}


/**
 * index.d.ts  arquivos de definição de tipos
 * 
 * após criar ir até "typeRoots":[], dentro da configuração do ts
 * e colocamos a rota  "typeRoots":["./node_modules/@types", "./@types"], 
 * 
 * 
 */