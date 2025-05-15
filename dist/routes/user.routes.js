"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const notes_controller_1 = require("../controllers/notes.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router
    .post('/login', auth_controller_1.userAuthController.login.bind(auth_controller_1.userAuthController))
    .post('/signup', auth_controller_1.userAuthController.signup.bind(auth_controller_1.userAuthController))
    .post('/logout', auth_controller_1.userAuthController.logout.bind(auth_controller_1.userAuthController));
router
    .post('/create/notes', verifyToken_1.default, notes_controller_1.notesController.createNotes.bind(notes_controller_1.notesController))
    .get('/get/notes', verifyToken_1.default, notes_controller_1.notesController.getNotes.bind(notes_controller_1.notesController))
    .patch('/edit/note', verifyToken_1.default, notes_controller_1.notesController.editNote.bind(notes_controller_1.notesController))
    .patch('/share/note', verifyToken_1.default, notes_controller_1.notesController.shareNote.bind(notes_controller_1.notesController))
    .get('/get/all-notes', verifyToken_1.default, notes_controller_1.notesController.getAllNotes.bind(notes_controller_1.notesController));
exports.userRoutes = router;
