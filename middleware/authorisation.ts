import jsonwebtoken from "jsonwebtoken"
import {Response, Request, NextFunction} from "express"





interface RequestWithUser extends Request {
 user: string
 }

const jwt = jsonwebtoken



export default async (req: any, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.header("token");
 
        if (!jwtToken) {
            return res.status(403).json("Not Authorised")
        }
        const payload = jwt.verify(jwtToken, process.env.jwtSecret ) as jsonwebtoken.JwtPayload;

        req.user = payload.user

        

        next()
        
    } catch (error) { 
        console.error(error) 
        return res.status(403).json("Not Authorised")
    }
}