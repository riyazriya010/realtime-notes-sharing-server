"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constant_1 = require("./utils/constant");
const dbConfig_1 = require("./config/dbConfig");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = require("./routes/user.routes");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        // origin: `${CORS_ORIGIN}`,
        origin: "https://realtime-notes-sharing-client.vercel.app/",
        methods: ["GET", "POST", 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
        credentials: true
    }
});
(0, dbConfig_1.connectDB)();
const PORT = constant_1.SERVER_PORT;
const corsOptions = {
    // origin: String(CORS_ORIGIN),
    origin: "https://realtime-notes-sharing-client.vercel.app/",
    methods: constant_1.CORS_METHODS,
    credentials: Boolean(constant_1.CORS_CREDENTIALS),
    preflightContinue: false,
    optionsSuccessStatus: 200 // 204 the older bowser or smart tv can't interupt with 204
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    //Updated Message
    socket.on('update', (data) => {
        socket.broadcast.emit('updating', data);
    });
    //Disconnecting Socket
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
app.use('/api/user', user_routes_1.userRoutes);
server.listen(PORT, (error) => {
    if (error)
        throw error;
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
