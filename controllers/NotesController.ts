import { payload } from '../utils/authUtils';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

//Protected Routes
// To FetchAll Notes of User
async function getAllNote(req: Request, res: Response) {
        const allNotes = await prisma.note.findMany({
                where: {
                        userId: payload.userId!,
                }
        }).catch(err => {
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
        }).catch(err => {
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
                content: req.body.content,
                userId: payload.userId!,
                tag: req.body.tag,
                title: req.body.title,
                priority: req.body.priority,
                isPinned: req.body.isPinned,
                color: req.body.color
        };
        await prisma.note.create({ data: newNote }).then(() => {
                res.status(201).json({
                        success: true,
                })
        }).catch(err => {
                res.status(500).json({
                        success: false,
                        err: err,
                })
        })
}


async function editExistingNote(req: Request, res: Response) {
        try {
                const updateNote = {
                        content: req.body.content,
                        contentId: req.params.id,
                        tag: req.body.tag,
                        title: req.body.title,
                        priority: req.body.priority,
                        isPinned: req.body.isPinned,
                        color: req.body.color
                }
                await prisma.note.update({
                        where: {
                                contentId: updateNote.contentId,
                        },
                        data: updateNote,
                })
                res.status(201).send({ success: true })
        }
        catch (err) {
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
                const { content, contentId, userId, tag, title,color, priority, isPinned } = singleNote;
                await prisma.trash.create({
                        data: {
                                content,
                                contentId,
                                userId,
                                tag,
                                title,
                                color,
                                priority,
                                isPinned
                        }
                });
                await prisma.note.delete({
                        where: {
                                contentId: id,
                        }
                })
                res.status(201).json({
                        success: true,
                        contentId,
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