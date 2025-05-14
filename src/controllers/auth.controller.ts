import { Request, Response } from "express";
import UserAuthServices, { userAuthServices } from "../services/auth.services";
import { sendAuthResponse, sendDataResponse, sendErrorResponse } from "../utils/responseHelpers";
import { HttptatusCode } from "../utils/httpStatusCodes";
import { JwtService } from "../integration/jwt";

export default class UserAuthController {
    private userAuthServices: UserAuthServices
    private jwtService: JwtService

    constructor(userAuthServices: UserAuthServices) {
        this.userAuthServices = userAuthServices
        this.jwtService = new JwtService()
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const loginUser = await this.userAuthServices.loginUser(data)

            //create Jwt Token
            const accessToken = await this.jwtService.createAccessToken(loginUser?._id, String(loginUser?.email))
            const refreshToken = await this.jwtService.createRefreshToken(loginUser?._id, String(loginUser?.email))

            //Sending Response back to client
            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "User Logged",
                HttptatusCode.OK,
                loginUser
            )
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'InvalidCredentials') {
                    sendErrorResponse(res, HttptatusCode.UNAUTHORIZED, "Invalid Credentials")
                    return;
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const savedUser = await this.userAuthServices.createUser(data)

            //create Jwt Token
            const accessToken = await this.jwtService.createAccessToken(savedUser?._id, String(savedUser?.email))
            const refreshToken = await this.jwtService.createRefreshToken(savedUser?._id, String(savedUser?.email))

            //Sending Response back to client
            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "User Saved To DB",
                HttptatusCode.OK,
                savedUser
            )
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'ExistingUser') {
                    sendErrorResponse(res, HttptatusCode.CONFLICT, "Existing User")
                    return;
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }
}
export const userAuthController = new UserAuthController(userAuthServices);
