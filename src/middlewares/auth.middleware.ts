import {Request, Response, NextFunction} from 'express';
import 'dotenv/config'
import jwt, { JwtPayload }  from 'jsonwebtoken';
import userServices from '../service/user.services';


export function authMiddleware(req: Request, res: Response, next: NextFunction):void {
    const headerToken = req.headers.authorization;
   
    //verifica se o headers tem alguma informação 
    if (!headerToken) {
       res.status(401).send({ message: 'The token was not informed' });
       return
    }

    //divide esta informação em duas partes dentro de um array
    const partsToken: string[] = headerToken.split(" ");
   
    // se tiver mais que duas partes [Bearer, jbóje´vj´jb] esta errado
    if (partsToken.length !== 2) {
        res.status(401).send({ message: 'Invalid token' });
        return
    }

    const [schema, token] = partsToken;

    //verifica co regex se o primeiro elemento é "Bearer"
    if (!/^Bearer$/i.test(schema)) {
        res.status(401).send({ message: 'Malformatted token' });
        return
    }


    //agora com tudo validado usa o verify do JWT
    jwt.verify(token, process.env.SECRET_JWT as string, async (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).send({ message: "Invalid token" });
        }
    
        // Supondo que o 'decoded' tem a forma de um JwtPayload com 'id'
        const user = await userServices.findUserByIdService((decoded as jwt.JwtPayload).id);
    
        if (!user) {
          return res.status(401).send({ message: "Invalid token" });
        }
    
        // Armazena o userId no objeto de resposta
        res.userId = user.id;
    
        next(); 
      });
}
