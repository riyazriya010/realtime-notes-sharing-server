import mongoose from "mongoose";
import { NotesServMethods } from "../interface/user.interface";
import { NotesSave } from "../interface/user.types";
import { INotes } from "../models/notes.model";
import NotesRepository from "../repositories/notes.repositories";

export default class NotesServices implements NotesServMethods {
    private notesRepository: NotesRepository
    constructor(notesRepository: NotesRepository) {
        this.notesRepository = notesRepository
    }

    async createNotes(data: NotesSave, ownerId: string): Promise<INotes> {
        try {
            const modifiedData = {
                title: data.title,
                content: data.content,
                createdBy: new mongoose.Types.ObjectId(ownerId),
                lastUpdated: new mongoose.Types.ObjectId(ownerId)
            }
            const savedNotes = await this.notesRepository.createNotes(modifiedData)
            return savedNotes
        } catch (error: unknown) {
            throw error
        }
    }

    async getNotes(notesId: string, userId: string): Promise<INotes | null> {
        try {
            const notes = await this.notesRepository.getNotes(notesId, userId)
            if (!notes) {
                const error = new Error('Notes Not Found')
                error.name = 'NotesNotFound'
                throw error
            }
            return notes
        } catch (error: unknown) {
            throw error
        }
    }

    async editNote(notesId: string, userId: string, data: any): Promise<INotes | null> {
        try {
            const lastUpdated = new mongoose.Types.ObjectId(userId)
            const updatedNotes = await this.notesRepository.editNote(notesId, { ...data, lastUpdated })
            return updatedNotes
        } catch (error: unknown) {
            throw error
        }
    }

    async shareNote(userId: string, noteId: string, email: string, permission: string): Promise<INotes | null> {
        try {
            const findPerson = await this.notesRepository.findByEmails(email)
            if (!findPerson) {
                const error = new Error('User Not Found')
                error.name = 'UserNotFound'
                throw error
            }
            console.log('find ', findPerson)
            console.log('permission ', permission)


            if (String(findPerson._id) === userId) {
                const error = new Error("You're sharing to your current email")
                error.name = 'SameEmail'
                throw error
            }
            const shareNote = await this.notesRepository.shareNote(noteId, findPerson._id, permission)
            return shareNote
        } catch (error: unknown) {
            console.log('service err ',error)
            throw error
        }
    }


    async getAllNotes(userId: string): Promise<INotes[] | any> {
        try {
            const getNotes = await this.notesRepository.getAllNotes(userId)
            return getNotes
        } catch (error: unknown) {
            throw error
        }
    }


}

const notesRepository = new NotesRepository()
export const notesServices = new NotesServices(notesRepository)

