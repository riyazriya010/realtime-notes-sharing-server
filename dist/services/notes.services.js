"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notes_repositories_1 = __importDefault(require("../repositories/notes.repositories"));
class NotesServices {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    createNotes(data, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modifiedData = {
                    title: data.title,
                    content: data.content,
                    createdBy: new mongoose_1.default.Types.ObjectId(ownerId),
                    lastUpdated: new mongoose_1.default.Types.ObjectId(ownerId)
                };
                const savedNotes = yield this.notesRepository.createNotes(modifiedData);
                return savedNotes;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNotes(notesId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield this.notesRepository.getNotes(notesId, userId);
                if (!notes) {
                    const error = new Error('Notes Not Found');
                    error.name = 'NotesNotFound';
                    throw error;
                }
                return notes;
            }
            catch (error) {
                throw error;
            }
        });
    }
    editNote(notesId, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastUpdated = new mongoose_1.default.Types.ObjectId(userId);
                const updatedNotes = yield this.notesRepository.editNote(notesId, Object.assign(Object.assign({}, data), { lastUpdated }));
                return updatedNotes;
            }
            catch (error) {
                throw error;
            }
        });
    }
    shareNote(userId, noteId, email, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findPerson = yield this.notesRepository.findByEmails(email);
                if (!findPerson) {
                    const error = new Error('User Not Found');
                    error.name = 'UserNotFound';
                    throw error;
                }
                console.log('find ', findPerson);
                console.log('permission ', permission);
                if (String(findPerson._id) === userId) {
                    const error = new Error("You're sharing to your current email");
                    error.name = 'SameEmail';
                    throw error;
                }
                const shareNote = yield this.notesRepository.shareNote(noteId, findPerson._id, permission);
                return shareNote;
            }
            catch (error) {
                console.log('service err ', error);
                throw error;
            }
        });
    }
    getAllNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getNotes = yield this.notesRepository.getAllNotes(userId);
                return getNotes;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = NotesServices;
const notesRepository = new notes_repositories_1.default();
exports.notesServices = new NotesServices(notesRepository);
