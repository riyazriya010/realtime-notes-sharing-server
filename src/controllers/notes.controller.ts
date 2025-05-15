import { Request, Response } from "express";
import NotesServices, { notesServices } from "../services/notes.services";
import { sendDataResponse, sendErrorResponse } from "../utils/responseHelpers";
import { HttptatusCode } from "../utils/httpStatusCodes";
import { getId } from "../integration/getId";

export default class NotesController {
    private notesServices: NotesServices
    constructor(notesServices: NotesServices) {
        this.notesServices = notesServices
    }

    async createNotes(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const ownerId = await getId('accessToken', req) as string
            const savedNotes = await this.notesServices.createNotes(data, ownerId)
            sendDataResponse(res, "Notes Created", savedNotes, HttptatusCode.CREATED)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    async getNotes(req: Request, res: Response): Promise<void> {
        try {
            const { notesId } = req.query
            const userId = await getId('accessToken', req) as string
            const notes = await this.notesServices.getNotes(String(notesId), userId)
            sendDataResponse(res, "Notes Got It", notes, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'NotesNotFound') {
                    sendErrorResponse(res, HttptatusCode.NOT_FOUND, "Notes Not Found");
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    async editNote(req: Request, res: Response): Promise<void> {
        try {
            const { noteId } = req.query
            const data = req.body
            const userId = await getId('accessToken', req) as string
            const updatedNotes = await this.notesServices.editNote(String(noteId), userId, data)
            sendDataResponse(res, "Notes Updated", updatedNotes, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
            return
        }
    }

    async shareNote(req: Request, res: Response): Promise<void> {
        try {
            const { noteId, email, permission } = req.query
            const userId = await getId('accessToken', req) as string
            const response = await this.notesServices.shareNote(userId, String(noteId), String(email), String(permission))
            sendDataResponse(res, "Notes Shared", response, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            console.log('controller err ',error)
            if (error instanceof Error) {
                if (error.name === 'UserNotFound') {
                    sendErrorResponse(res, HttptatusCode.NOT_FOUND, "User Not Found");
                    return
                }
                if (error.name === 'SameEmail') {
                    sendErrorResponse(res, HttptatusCode.CONFLICT, "You're sharing to your current email");
                    return
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
            return
        }
    }


    async getAllNotes(req: Request, res: Response): Promise<void> {
        try {
            const {userId} = req.query
            const response = await this.notesServices.getAllNotes(String(userId))
            sendDataResponse(res, "All Notes Got It", response, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
            return
        }
    }

}

export const notesController = new NotesController(notesServices)

