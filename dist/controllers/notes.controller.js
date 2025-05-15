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
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesController = void 0;
const notes_services_1 = require("../services/notes.services");
const responseHelpers_1 = require("../utils/responseHelpers");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const getId_1 = require("../integration/getId");
class NotesController {
    constructor(notesServices) {
        this.notesServices = notesServices;
    }
    createNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const ownerId = yield (0, getId_1.getId)('accessToken', req);
                const savedNotes = yield this.notesServices.createNotes(data, ownerId);
                (0, responseHelpers_1.sendDataResponse)(res, "Notes Created", savedNotes, httpStatusCodes_1.HttptatusCode.CREATED);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
            }
        });
    }
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { notesId } = req.query;
                const userId = yield (0, getId_1.getId)('accessToken', req);
                const notes = yield this.notesServices.getNotes(String(notesId), userId);
                (0, responseHelpers_1.sendDataResponse)(res, "Notes Got It", notes, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'NotesNotFound') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.NOT_FOUND, "Notes Not Found");
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
            }
        });
    }
    editNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { noteId } = req.query;
                const data = req.body;
                const userId = yield (0, getId_1.getId)('accessToken', req);
                const updatedNotes = yield this.notesServices.editNote(String(noteId), userId, data);
                (0, responseHelpers_1.sendDataResponse)(res, "Notes Updated", updatedNotes, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    shareNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { noteId, email, permission } = req.query;
                const userId = yield (0, getId_1.getId)('accessToken', req);
                const response = yield this.notesServices.shareNote(userId, String(noteId), String(email), String(permission));
                (0, responseHelpers_1.sendDataResponse)(res, "Notes Shared", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                console.log('controller err ', error);
                if (error instanceof Error) {
                    if (error.name === 'UserNotFound') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.NOT_FOUND, "User Not Found");
                        return;
                    }
                    if (error.name === 'SameEmail') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.CONFLICT, "You're sharing to your current email");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    getAllNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                const response = yield this.notesServices.getAllNotes(String(userId));
                (0, responseHelpers_1.sendDataResponse)(res, "All Notes Got It", response, httpStatusCodes_1.HttptatusCode.OK);
                return;
            }
            catch (error) {
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
}
exports.default = NotesController;
exports.notesController = new NotesController(notes_services_1.notesServices);
