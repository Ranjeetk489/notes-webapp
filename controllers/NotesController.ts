import { payload } from '../utils/authUtils';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import cuid from 'cuid';

const prisma = new PrismaClient();

//Protected Routes
// To FetchAll Notes of User
async function getAllNote(req: Request, res: Response) {
        const allNotes = await prisma.note.findMany({
                where: {
                        userId: payload.userId!,
                }
        }).catch((err: any) => {
                console.log(err);
                res.status(500).json({
                        success: false,
                        response: "",
                })
        });
        res.status(201).json({
                success: true,
                response: allNotes,
        })
}

async function getSingleNote(req: Request, res: Response) {
        const singleNote = await prisma.note.findUnique({
                where: {
                        contentId: req.params.id,
                }
        }).catch((err: any) => {
                console.log(err)
                res.status(500).json({
                        success: false,
                        response: '',
                })
        })
        res.status(201).json({
                success: true,
                response: singleNote,
        })
}

async function addNewNote(req: Request, res: Response) {
        const newNote = {
                title: req.body.title,
                color: req.body.color,
                content: req.body.content,
                tag: req.body.tag,
                priority: req.body.priority,
                userId: payload.userId!,
        }
        try {
                await prisma.note.create({
                        data: newNote,
                })
                const allNotes = await prisma.note.findMany({
                        where: {
                                userId: payload.userId!,
                        }
                })
                res.status(201).json({
                        success: true,
                        response: allNotes,
                })
        }
        catch (err) {
                console.log(err);
                res.status(500).json({
                        success: false,
                        response: 'request failed',
                })
        }
}

async function editExistingNote(req: Request, res: Response) {
        try {
                const updateNote = {
                        contentId: req.params.id,
                        content: req.body.content,
                        tag: req.body.tag,
                        title: req.body.title,
                        priority: req.body.priority,
                        color: req.body.color
                }
                await prisma.note.update({
                        where: {
                                contentId: updateNote.contentId,
                        },
                        data: updateNote,
                })
                const allNotes = await prisma.note.findMany({
                        where: {
                                userId: payload.userId!,
                        }
                })
                res.status(201).send({ success: updateNote, response: allNotes })
        }
        catch (err) {
                console.log(err)
                res.status(500).json({ success: false })
        }
}

async function deleteNote(req: Request, res: Response) {
        try {
                const id = req.params.id;
                const singleNote = await prisma.note.findFirst({
                        where: {
                                contentId: id,
                        }
                })
                //@ts-ignore
                const { content, contentId, userId, tag, title, color, priority } = singleNote;
                await prisma.trash.create({
                        data: {
                                content,
                                contentId,
                                userId,
                                tag,
                                title,
                                color,
                                priority,
                        }
                });
                await prisma.note.delete({
                        where: {
                                contentId: id,
                        }
                })
                const allNotes = await prisma.note.findMany({
                        where: {
                                userId: payload.userId!,
                        }
                })
                res.status(201).json({
                        success: true,
                        response: allNotes,
                })
        }
        catch (err) {
                console.log(err);
                res.status(500).json({
                        success: false,
                        error: err
                })
        }
}

export { getAllNote, getSingleNote, addNewNote, deleteNote, editExistingNote }