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
const notes_model_1 = __importDefault(require("../models/notes.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const common_repository_1 = __importDefault(require("./base/common.repository"));
class NotesRepository extends common_repository_1.default {
    constructor() {
        super({
            Notes: notes_model_1.default,
            User: user_model_1.default
        });
    }
    createNotes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createData('Notes', data);
        });
    }
    getNotes(notesId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne('Notes', {
                _id: notesId,
                $or: [
                    { createdBy: userId },
                    { 'collaborators.userId': userId }
                ]
            });
        });
    }
    editNote(noteId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('idd ', noteId);
            console.log('data ', data);
            return this.updateById('Notes', noteId, {
                $set: Object.assign(Object.assign({}, data), { lastUpdated: data.lastUpdated })
            });
        });
    }
    shareNote(noteId, userId, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateById('Notes', noteId, {
                $addToSet: {
                    collaborators: {
                        userId: userId,
                        permission: permission,
                    }
                }
            });
        });
    }
    getAllNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll('Notes', {
                $or: [
                    { createdBy: userId },
                    { 'collaborators.userId': userId }
                ]
            });
        });
    }
    findByEmails(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne('User', { email });
        });
    }
}
exports.default = NotesRepository;
