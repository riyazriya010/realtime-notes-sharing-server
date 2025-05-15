import mongoose, { Document, Schema } from "mongoose";

interface ICollaborator {
  userId: Schema.Types.ObjectId;
  permission: 'read' | 'write';
}

export interface INotes extends Document {
  title: string;
  content: string;
  createdBy: Schema.Types.ObjectId;
  collaborators: ICollaborator[];
  lastUpdated: Schema.Types.ObjectId
}

const CollaboratorSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  permission: { type: String, required: true, enum: ['read', 'write'] }
});

const NotesSchema: Schema<INotes> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  collaborators: [CollaboratorSchema],
  lastUpdated: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true
});

const NotesModel = mongoose.model<INotes>('notes', NotesSchema);
export default NotesModel;
