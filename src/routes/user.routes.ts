import express from 'express';
import { userAuthController } from '../controllers/auth.controller';
import { notesController } from '../controllers/notes.controller';

const router = express.Router()


router
.post('/login', userAuthController.login.bind(userAuthController))
.post('/signup', userAuthController.signup.bind(userAuthController))


router
.post('/create/notes', notesController.createNotes.bind(notesController))
.get('/get/notes', notesController.getNotes.bind(notesController))
.patch('/edit/note', notesController.editNote.bind(notesController))
.patch('/share/note', notesController.shareNote.bind(notesController))
.get('/get/all-notes', notesController.getAllNotes.bind(notesController))

export const userRoutes = router;
