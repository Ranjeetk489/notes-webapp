import { createAccessToken, createRefreshToken } from './../utils/authUtils';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';
import { hashSync, compareSync, compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash';
import 'dotenv/config';
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();
async function register(req: Request, res: Response) {

    try {
        let userId = uuidv4();
        const { username, email, password } = req.body;
        if (!(username && email && password)) {
            res.status(401).send("All inputs are required")
        }
        const newUser = {
            username: username,
            email: email.toLowerCase(),
            userId: userId,
            password: hashSync(password, 10),
        }

        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        if (oldUser) {
            return res.status(409).send("User Already Exists")
        }

        await prisma.user.create({data: newUser}).catch(e => console.error(e))
        res.cookie("RTId", createRefreshToken(userId), {
            httpOnly: true,
        })
        res.status(201).json({
            success: true,
            message: "User Creation Successful",
            accessToken: createAccessToken(userId)  
        })
    }
    catch (e) {
        res.send({
        success: false,
        message: "Error has occured",
        err: e, 
        })}
}



async function login(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email.toLowerCase(),
        },
    })
    if (user === null) {
        return res.status(401).send({
            success: false,
            message: "email or password is wrong",
        })
    }
    const valid = await compareSync(req.body.password, user.password)
    if (valid) {
        res.cookie("RTId", createRefreshToken(user.userId), {
            httpOnly: true,
        })
        res.status(201).json({
            success: true,
            message: "login Successful",
            accessToken: createAccessToken(user.userId)
        })
    }
    else {
        res.send({
            success: false,
            message: "email or password is wrong",
        })
    }
}

export { register, login }