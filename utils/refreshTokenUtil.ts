import { createAccessToken} from './authUtils';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function refreshToken(req: Request, res:Response){
    console.log(req.cookies);
    const token = req.cookies.RTId;
    if(!token) {
        return res.status(400).send({success: false, accessToken: ' '})
    }
    try {
        jwt.verify(token, process.env.REFRESH_TOKEN,(err: any, decoded:any) => {
            const validUser = prisma.user.findUnique({
                where: {
                    userId: decoded.userId
                }
            })
            const newAccessToken = createAccessToken(decoded.userId);
            console.log(process.env.REFRESH_TOKEN)
            if(validUser !== null) {
                //// token is valid and we can send back access token
                return res.send({
                    success: true,
                    accessToken: newAccessToken,
                })
            }
            else {
                return res.status(400).send({success: false, accessToken: ' '})
            }
        })
    }
    catch(err) {
        console.log(err);
        
    }
}
