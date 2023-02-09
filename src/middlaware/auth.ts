import {Response, Request} from 'express'
import { verify } from 'jsonwebtoken';
import config from '../configuration/config';

export default async (req: Request, res: Response, next: Function ) => {

    let token = req.body.token || req.query.token || req.headers['x-token-access'];

    if (token){

        try {
            let _userAuth = verify(token, config.secretyKey )
            req.userAuth = _userAuth;
            next();
        } catch (error) {
            res.status(401).send('Token informado é inválido!')
        }
        
    }else {
        token.status(401).send('Para acessar este recurso você precisa estar autenticado')
    }


}