import { Request, Response, NextFunction} from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'

dotenv.config();

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let sucess = false;
        
        if(req.headers.authorization) {
            
            const [authType, token] = req.headers.authorization.split(' ');
            
            if(authType === 'Bearer') {
                const decoded = JWT.verify(
                    token,
                    process.env.JWT_SECRET_KEY as string
                );

                console.log("DECODED", decoded)
            }
            
        }

        if(sucess) {
            next();
        } else {
            res.status(403); // Not authorized;
            res.json({ error: 'Não autorizado' });
        }
    } 
}