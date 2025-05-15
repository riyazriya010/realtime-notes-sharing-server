import { NotesRepoMethods } from "../interface/user.interface";
import { NotesSaveRepo } from "../interface/user.types";
import NotesModel, { INotes } from "../models/notes.model";
import UserModel, { IUser } from "../models/user.model";
import CommonBaseRepository from "./base/common.repository";

export default class NotesRepository extends CommonBaseRepository<{
    Notes: INotes
    User: IUser
}> implements NotesRepoMethods {
    constructor() {
        super({
            Notes: NotesModel,
            User: UserModel
        })
    }

    async createNotes(data: NotesSaveRepo): Promise<INotes> {
        return this.createData('Notes', data)
    }

    async getNotes(notesId: string, userId: string): Promise<INotes | null> {
        return this.findOne('Notes', {
            _id: notesId,
            $or: [
                { createdBy: userId },
                { 'collaborators.userId': userId }
            ]
        });
    }

    async editNote(noteId: string, data: any): Promise<INotes | null> {
        console.log('idd ', noteId)
        console.log('data ', data)
        return this.updateById('Notes', noteId, {
            $set: {
                ...data,
                lastUpdated: data.lastUpdated,
            }
        })
    }

    async shareNote(noteId: string, userId: any, permission: string): Promise<INotes | null> {
        return this.updateById('Notes', noteId, {
            $addToSet: {
                collaborators: {
                    userId: userId,
                    permission: permission,
                }
            }
        })
    }

    async getAllNotes(userId: string): Promise<INotes[] | any> {
        return this.findAll('Notes', {
            $or: [
                { createdBy: userId },
                { 'collaborators.userId': userId }
            ]
        })
    }

    async findByEmails(email: string): Promise<IUser | null> {
        return this.findOne('User', { email })
    }

}

