import { INotes } from "../models/notes.model";
import { IUser } from "../models/user.model";
import { LoginData, NotesSave, NotesSaveRepo, SignUpData } from "./user.types";

export interface UserAuthRepoMethods {
    findByEmail(email: string): Promise<IUser | null>
    createUser(data: SignUpData): Promise<IUser>
}

export interface UserAuthServMethods {
    loginUser(data: LoginData): Promise<IUser | null>
    createUser(data: SignUpData): Promise<IUser>
}


//Notes methods
export interface NotesServMethods {
    createNotes(data: NotesSave, ownerId: string): Promise<INotes>
    getNotes(notesId: string, userId: string): Promise<INotes | null>
    editNote(notesId: string, userId: string, data: any): Promise<INotes | null>
    shareNote(userId: string, noteId: string, email: string, permission: string): Promise<INotes | null>
}


export interface NotesRepoMethods {
    createNotes(data: NotesSaveRepo): Promise<INotes>
    getNotes(notesId: string, userId: string): Promise<INotes | null>
    editNote(noteId: string, data: any): Promise<INotes | null>
    shareNote(noteId: string, userId: any, permission: string): Promise<INotes | null>
}
