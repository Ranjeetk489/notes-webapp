// import {payload } from './utils/authUtils';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { login, register } from './controllers/AuthController';
import { authUtils } from './utils/authUtils';
import { refreshToken } from './utils/refreshTokenUtil';
import cookieParser = require('cookie-parser');
import { addNewNote, deleteNote, editExistingNote, getAllNote, getSingleNote } from './controllers/NotesController';
import { addNewArchivedNote, deleteArchivedNote, editExistingArchivedNote, getAllarchivedNotes, getSinglearchivedNote } from './controllers/ArchiveController';
import { getAllTrashNotes, getSingleTrashNote, addNewTrashNote, deleteTrashNote, editExistingTrashNote, restoreTrashNote } from './controllers/TrashController';
import { userInfo } from './controllers/UserController';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

//User- Management Routes
app.post('/signup', register);
app.post('/login', login);
//protected Route
app.get('/user_info',authUtils, userInfo);
//protected Route 
//Refresh Access Token
app.post('/refresh_token', authUtils, refreshToken);

//Notes-Management Routes
//Protected Routes
//Route to show notes
app.get('/all_notes', authUtils, getAllNote);
//route to add new note
app.post('/add_new', authUtils, addNewNote);
//route to show single note based on id of note
app.get('/single_note:id', authUtils, getSingleNote);
//route to edit single note base on id of note
app.post('/edit_note:id', authUtils, editExistingNote);
//route to move a note to trash  by id
app.post('/trash_note:id', authUtils, deleteNote);
//route to set a note as pinned


//Archive Notes Management Routes
//Protected Routes
//Route to show archived notes
app.get("/all_archived_notes", authUtils, getAllarchivedNotes);
//route to add new archived note
app.post('/add_archive_note', authUtils, addNewArchivedNote);
//route to show single archived note based on id of note
app.get('/single_archived_note:id', authUtils, getSinglearchivedNote);
//route to edit single archived note base on id of note
app.post('/edit_archived_note:id', authUtils, editExistingArchivedNote);
//route to move archived note to trash by id
app.post('/trash_archive_note:id', authUtils, deleteArchivedNote);



//Trash Notes Management Routes
//Protected Routes
//Route to show notes
app.get("/all_trash_notes", authUtils, getAllTrashNotes);
//route to add new note
app.post('/add_trash_note', authUtils, addNewTrashNote);
//route to show single note based on id of note
app.get('/single_trash_note:id', authUtils, getSingleTrashNote);
//route to edit single note base on id of note
app.post('/edit_trash_note:id', authUtils, editExistingTrashNote);
//route to delete trash note by id
app.post('/delete_trash_note:id', authUtils, deleteTrashNote);
//route to restore trash note
app.post('/restore_trash_note:id', authUtils, restoreTrashNote);

const server = app.listen(process.env.PORT||PORT, () => {
    console.log(`server is ready  at ${process.env.PORT||PORT}`)
})

