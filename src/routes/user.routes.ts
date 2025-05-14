import express from 'express';
import { userAuthController } from '../controllers/auth.controller';

const router = express.Router()


router
.post('/login', userAuthController.login.bind(userAuthController))
.post('/signup', userAuthController.signup.bind(userAuthController))

export const userRoutes = router;
