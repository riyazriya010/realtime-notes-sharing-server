"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttptatusCode = void 0;
var HttptatusCode;
(function (HttptatusCode) {
    // succeess
    HttptatusCode[HttptatusCode["OK"] = 200] = "OK";
    HttptatusCode[HttptatusCode["CREATED"] = 201] = "CREATED";
    HttptatusCode[HttptatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    HttptatusCode[HttptatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    // front end errorrs
    HttptatusCode[HttptatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttptatusCode[HttptatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttptatusCode[HttptatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttptatusCode[HttptatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttptatusCode[HttptatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HttptatusCode[HttptatusCode["CONFLICT"] = 409] = "CONFLICT";
    HttptatusCode[HttptatusCode["VALIDATION_ERROR"] = 422] = "VALIDATION_ERROR";
    HttptatusCode[HttptatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    // server end errorrs
    HttptatusCode[HttptatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttptatusCode[HttptatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HttptatusCode[HttptatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HttptatusCode[HttptatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HttptatusCode[HttptatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(HttptatusCode || (exports.HttptatusCode = HttptatusCode = {}));
