import express from 'express';
import { CORS_CREDENTIALS, CORS_METHODS, CORS_ORIGIN, SERVER_PORT } from './utils/constant';
import { connectDB } from './config/dbConfig';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';


const app = express()

connectDB()

const PORT = SERVER_PORT

const corsOptions = {
    origin: String(CORS_ORIGIN),
    methods: CORS_METHODS,
    credentials: Boolean(CORS_CREDENTIALS),
    preflightContinue: false,
    optionsSuccessStatus: 200 // 204 the older bowser or smart tv can't interupt with 204
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(PORT, (error?: Error) => {
    if(error) throw error
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})