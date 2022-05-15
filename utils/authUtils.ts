import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const payload = {
    userId: null,
}
export function authUtils(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        jwt.verify(token, process.env.SECRET_TOKEN, (err: any, decoded: any) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Not Authorized",
                    error: err,
                })
            }
            console.log(decoded)
            const valid = prisma.user.findUnique({
                where: {
                    userId: decoded.userId,
                }
            })
            if (valid !== null) {
                payload.userId = decoded.userId;
                next();
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Not Authorized"
        })
    }
}

export const createAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.SECRET_TOKEN, {expiresIn: '2h'})
}

export const createRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN,{ expiresIn: '7d'})
}