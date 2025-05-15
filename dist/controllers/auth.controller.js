"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthController = void 0;
const auth_services_1 = require("../services/auth.services");
const responseHelpers_1 = require("../utils/responseHelpers");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const jwt_1 = require("../integration/jwt");
class UserAuthController {
    constructor(userAuthServices) {
        this.userAuthServices = userAuthServices;
        this.jwtService = new jwt_1.JwtService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const loginUser = yield this.userAuthServices.loginUser(data);
                //create Jwt Token
                const accessToken = yield this.jwtService.createAccessToken(loginUser === null || loginUser === void 0 ? void 0 : loginUser._id, String(loginUser === null || loginUser === void 0 ? void 0 : loginUser.email));
                const refreshToken = yield this.jwtService.createRefreshToken(loginUser === null || loginUser === void 0 ? void 0 : loginUser._id, String(loginUser === null || loginUser === void 0 ? void 0 : loginUser.email));
                //Sending Response back to client
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), "User Logged", httpStatusCodes_1.HttptatusCode.OK, loginUser);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'InvalidCredentials') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.UNAUTHORIZED, "Invalid Credentials");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const savedUser = yield this.userAuthServices.createUser(data);
                //create Jwt Token
                const accessToken = yield this.jwtService.createAccessToken(savedUser === null || savedUser === void 0 ? void 0 : savedUser._id, String(savedUser === null || savedUser === void 0 ? void 0 : savedUser.email));
                const refreshToken = yield this.jwtService.createRefreshToken(savedUser === null || savedUser === void 0 ? void 0 : savedUser._id, String(savedUser === null || savedUser === void 0 ? void 0 : savedUser.email));
                //Sending Response back to client
                (0, responseHelpers_1.sendAuthResponse)(res, String(accessToken), String(refreshToken), "User Saved To DB", httpStatusCodes_1.HttptatusCode.OK, savedUser);
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'ExistingUser') {
                        (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.CONFLICT, "Existing User");
                        return;
                    }
                }
                (0, responseHelpers_1.sendErrorResponse)(res, httpStatusCodes_1.HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
                return;
            }
        });
    }
}
exports.default = UserAuthController;
exports.userAuthController = new UserAuthController(auth_services_1.userAuthServices);
