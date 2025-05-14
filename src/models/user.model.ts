import mongoose, { Document, MongooseError, Schema } from "mongoose";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { HASHING_SALT_ROUND } from "../utils/constant";

export interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    const user = this
    try {
        const hashedPassword = await bcrypt.hash(user.password, Number(HASHING_SALT_ROUND))
        user.password = hashedPassword
        next();
    } catch (error: unknown) {
        if (error instanceof MongooseError) {
            throw error
        }
    }

})

const UserModel = mongoose.model<IUser>('user', UserSchema)
export default UserModel;
