import express from 'express';
import { CORS_CREDENTIALS, CORS_METHODS, CORS_ORIGIN, SERVER_PORT } from './utils/constant';
import { connectDB } from './config/dbConfig';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { userRoutes } from './routes/user.routes';
import http from 'http';
import { Server } from 'socket.io';


const app = express()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://realtime-notes-sharing-client.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ['Content-Type', 'Authorization', 'Role'],
    credentials: true
  }
});

connectDB()

const PORT = SERVER_PORT

const corsOptions = {
  origin: "https://realtime-notes-sharing-client.vercel.app",
  // origin: "http://localhost:3000",
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);


  //Updated Message
  socket.on('update', (data) => {
    socket.broadcast.emit('updating', data);
  })


  //Disconnecting Socket
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

});


app.use('/api/user',userRoutes);

server.listen(PORT, (error?: Error) => {
    if(error) throw error
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})