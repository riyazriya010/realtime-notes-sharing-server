import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Request } from 'express';

export interface CustomRequest extends Request {
    user?: {
        id: string;
        email: string;
        iat: number;
        exp: number
    }
}

export const getId = (token: string, req: CustomRequest): String | null => {
    try {
        const accessToken = req.cookies[token]
        const decodedData = jwt.decode(accessToken) as CustomRequest['user']
        if (!decodedData || !decodedData.id) return null;

        return decodedData.id;
    } catch (error: unknown) {
        if (error instanceof JsonWebTokenError) {
            const error = new Error('JWT Access Token Error')
            error.name = 'JwtAccessTokenError'
            throw error
        }
        throw error
    }
}
