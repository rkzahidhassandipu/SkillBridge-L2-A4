
import { NextFunction, Request, Response } from "express"
import {auth as betterAuth} from "../lib/auth"

export enum TutorRole{
    USER = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN"
}

declare global {
    namespace Express{
        interface Request {
           user?: {
             id: string,
            email: string,
            name: string,
            role: string
           }
        }
    }
}

const auth =(...roles: TutorRole[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
         const authHeader = req.headers.authorization;
console.log("Authorization header:", authHeader);
        const session = await betterAuth.api.getSession({
            headers: req.headers as any
        })
        if(!session){
            return res.status(401).json({
                success: false,
                message: "You are not authorized"
            })
        }

        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role as string
        }
        if(roles.length && !roles.includes(req.user.role as TutorRole)){
            return res.status(403).json({
                success: false,
                message: "Forbidden! You don't have permission to access this resource!"
            })
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export default auth