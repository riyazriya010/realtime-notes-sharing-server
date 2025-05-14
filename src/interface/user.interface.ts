import { IUser } from "../models/user.model";
import { LoginData, SignUpData } from "./user.types";

export interface UserAuthRepoMethods {
    findByEmail(email: string): Promise<IUser | null>
    createUser(data: SignUpData): Promise<IUser>
}

export interface UserAuthServMethods {
    loginUser(data: LoginData): Promise<IUser | null>
    createUser(data: SignUpData): Promise<IUser>
}
