"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendDataResponse = exports.sendAuthResponse = void 0;
const sendAuthResponse = (res, accessToken, refreshToken, message, statusCode, data) => {
    return res
        .status(statusCode)
        .cookie('accessToken', accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        // domain:'realtime-notes-sharing-client.vercel.app'
    })
        .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // domain: 'realtime-notes-sharing-client.vercel.app'
    })
        .json({
        success: true,
        message,
        accessToken,
        refreshToken,
        result: data
    });
};
exports.sendAuthResponse = sendAuthResponse;
const sendDataResponse = (res, message, data, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        message,
        result: data
    });
};
exports.sendDataResponse = sendDataResponse;
const sendErrorResponse = (res, statusCode, message, error) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: (error === null || error === void 0 ? void 0 : error.message) || error
    });
};
exports.sendErrorResponse = sendErrorResponse;
