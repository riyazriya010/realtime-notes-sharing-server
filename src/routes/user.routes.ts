import express from 'express';
import { userAuthController } from '../controllers/auth.controller';
import { notesController } from '../controllers/notes.controller';
// import authenticateToken from '../middleware/verifyToken';

const router = express.Router()


router
.post('/login', userAuthController.login.bind(userAuthController))
.post('/signup', userAuthController.signup.bind(userAuthController))
.post('/logout', userAuthController.logout.bind(userAuthController))


router
.post('/create/notes', notesController.createNotes.bind(notesController))
.get('/get/notes', notesController.getNotes.bind(notesController))
.patch('/edit/note', notesController.editNote.bind(notesController))
.patch('/share/note', notesController.shareNote.bind(notesController))
.get('/get/all-notes', notesController.getAllNotes.bind(notesController))

// router
// .post('/create/notes', authenticateToken, notesController.createNotes.bind(notesController))
// .get('/get/notes', authenticateToken, notesController.getNotes.bind(notesController))
// .patch('/edit/note', authenticateToken, notesController.editNote.bind(notesController))
// .patch('/share/note', authenticateToken, notesController.shareNote.bind(notesController))
// .get('/get/all-notes', authenticateToken, notesController.getAllNotes.bind(notesController))

export const userRoutes = router;
