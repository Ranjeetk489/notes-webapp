import { payload } from '../utils/authUtils';
import { Prisma, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

//Protected Routes
// To FetchAll archiveds of User
async function getAllarchivedNotes(req: Request, res: Response) {
    const allarchiveds = await prisma.archived.findMany({
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
        response: allarchiveds,
    })
}

async function getSinglearchivedNote(req: Request, res: Response) {
    const singlearchived = await prisma.archived.findUnique({
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
        response: singlearchived,
    })
}

async function addNewArchivedNote(req: Request, res: Response) {
    const newArchived = {
        title: req.body.title,
        color: req.body.color,
        content: req.body.content,
        tag: req.body.tag,
        priority: req.body.priority,
        userId: payload.userId!,
    }
    console.log(newArchived);
    await prisma.archived.create({ data: newArchived }).then(() => {
        res.status(201).json({
            success: true,
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            contentId: '',
            err: err,
        })
    })
}


async function editExistingArchivedNote(req: Request, res: Response) {
    const updateArchived = {
        contentId: req.params.id,
        content: req.body.content,
        tag: req.body.tag,
        title: req.body.title,
        priority: req.body.priority,
        color: req.body.color
    }
    await prisma.archived.update({
        where: {
            contentId: updateArchived.contentId,
        },
        data: updateArchived,
    })
}

async function deleteArchivedNote(req: Request, res: Response) {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const singleArchived = await prisma.archived.findFirst({
            where: {
                contentId: id,
            }
        })
        //@ts-ignore
        const { content, contentId, userId, tag, color, title, priority} = singleArchived;
        await prisma.trash.create({
            data: {
                content,
                contentId,
                userId,
                color,
                title,
                priority,
                tag
            }
        });
        await prisma.archived.delete({
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


export { getAllarchivedNotes, getSinglearchivedNote, addNewArchivedNote, deleteArchivedNote, editExistingArchivedNote }