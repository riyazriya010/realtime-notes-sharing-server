"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.HASHING_SALT_ROUND = exports.CORS_CREDENTIALS = exports.CORS_METHODS = exports.CORS_ORIGIN = exports.MONGODB_URI = exports.SERVER_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${process.cwd()}/.env` });
exports.SERVER_PORT = process.env.SERVER_PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.CORS_ORIGIN = process.env.CORS_ORIGIN;
exports.CORS_METHODS = (_a = (process.env.CORS_METHODS)) === null || _a === void 0 ? void 0 : _a.split(',');
exports.CORS_CREDENTIALS = process.env.CORS_CREDENTIALS = "true";
exports.HASHING_SALT_ROUND = process.env.HASHING_SALT_ROUND;
exports.JWT_SECRET = process.env.JWT_SECRET;
