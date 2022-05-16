import { payload } from '../utils/authUtils';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function userInfo(req:Request, res:Response) {
    try {
        const user = await prisma.user.findFirst({
            where:{
                userId: payload.userId!,
            }
        })
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            user: null,
            error: error,
        })
    }
}