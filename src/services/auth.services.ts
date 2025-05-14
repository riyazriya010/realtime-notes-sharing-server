import { UserAuthServMethods } from "../interface/user.interface";
import { LoginData, SignUpData } from "../interface/user.types";
import { IUser } from "../models/user.model";
import UserAuthRepository from "../repositories/auth.repository";
import bcrypt from 'bcrypt';

export default class UserAuthServices implements UserAuthServMethods {
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }

    async loginUser(data: LoginData): Promise<IUser | null> {
        try {
            const ExistingUser = await this.userAuthRepository.findByEmail(data.email)
            if (!ExistingUser) {
                const error = new Error('Invalid Credentials')
                error.name = 'InvalidCredentials'
                throw error
            }
            const isPassword = await bcrypt.compare(data.password, ExistingUser.password)
            if (!isPassword) {
                const error = new Error('Invalid Credentials')
                error.name = 'InvalidCredentials'
                throw error
            }
            return ExistingUser
        } catch (error: unknown) {
            throw error
        }
    }
    

    async createUser(data: SignUpData): Promise<IUser> {
        try{
            const ExistingUser = await this.userAuthRepository.findByEmail(data.email)
            if (ExistingUser) {
                const error = new Error('Existing User')
                error.name = 'ExistingUser'
                throw error
            }
            const savedUser = await this.userAuthRepository.createUser(data)
            return savedUser
        }catch(error: unknown){
            throw error
        }
    }
}

const userAuthRepository = new UserAuthRepository();
export const userAuthServices = new UserAuthServices(userAuthRepository);
