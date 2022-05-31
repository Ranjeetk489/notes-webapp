import { payload } from '../utils/authUtils';
import { Prisma, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

//Protected Routes
// To FetchAll trashNotes of User
async function getAllTrashNotes(req: Request, res: Response) {
    const allTrashNotes = await prisma.trash.findMany({
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
        response: allTrashNotes,
    })
}

async function getSingleTrashNote(req: Request, res: Response) {
    const singleTrashNote = await prisma.trash.findUnique({
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
        response: singleTrashNote,
    })
}

async function addNewTrashNote(req: Request, res: Response) {
    const newTrashNote = {
        content: req.body.content,
        tag: req.body.tag,
        title: req.body.title,
        color: req.body.color,
        priority: req.body.priority,
        userId: payload.userId!
    }
    try {
        await prisma.note.create({
            data: newTrashNote,
        })
        res.status(201).json({
            success: true,
            response: newTrashNote,
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


async function editExistingTrashNote(req: Request, res: Response) {
    try {
        const updateTrashNote = {
            contentId: req.params.id,
            content: req.body.content,
            tag: req.body.tag,
            title: req.body.title,
            priority: req.body.priority,
            color: req.body.color
        }
        await prisma.trash.update({
            where: {
                contentId: updateTrashNote.contentId,
            },
            data: updateTrashNote,
        })
        res.status(201).send({ success: true })
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

async function deleteTrashNote(req: Request, res: Response) {
    try {
        const id = req.params.id;

        await prisma.trash.delete({
            where: {
                contentId: id,
            }
        })
        res.status(201).json({
            success: true,
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

async function restoreTrashNote(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const trashNote = await prisma.trash.findFirst({
            where: {
                contentId: id,
            }
        })
        //@ts-ignore
        const { contentId, content, userId, tag, title, color, priority, isPinned } = trashNote;
        await prisma.note.create({
            data: {
                contentId,
                content,
                userId,
                title,
                color,
                priority,
                isPinned,
                tag
            }
        })
        await prisma.trash.delete({
            where: {
                contentId: id,
            }
        })
        res.status(201).json({ success: true, contentId: id });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err: err });
    }
}

export { getAllTrashNotes, getSingleTrashNote, addNewTrashNote, deleteTrashNote, editExistingTrashNote, restoreTrashNote };