import { UserAuthRepoMethods } from "../interface/user.interface";
import { LoginData, SignUpData } from "../interface/user.types";
import UserModel, { IUser } from "../models/user.model";
import CommonBaseRepository from "./base/common.repository";

export default class UserAuthRepository extends CommonBaseRepository<{
    User: IUser
}> implements UserAuthRepoMethods {
    constructor(){
        super({
            User: UserModel
        })
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.findOne('User',{email})
    }

    async createUser(data: SignUpData): Promise<IUser> {
        return await this.createData('User', data)
    }

}