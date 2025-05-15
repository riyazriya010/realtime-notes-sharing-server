import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constant';
export class JwtService {

    // Create Access Token
    async createAccessToken(id: Object | undefined, email: string): Promise<String | undefined> {
        try {
            const syncToken = await jwt.sign(
                { id, email },
                String(JWT_SECRET),
                { expiresIn: '2h' }
            )
            return syncToken
        } catch (error: unknown) {
            if (error instanceof JsonWebTokenError) {
                const error = new Error('JWT Access Token Error')
                error.name = 'JwtAccessTokenError'
                throw error
            }
            throw error
        }
    }

    // Create Refresh Token
    async createRefreshToken(id: Object | undefined, email: string): Promise<String | undefined> {
        try {
            const syncToken = await jwt.sign(
                { id, email },
                String(JWT_SECRET),
                { expiresIn: '7d' }
            )
            return syncToken
        } catch (error: unknown) {
            if (error instanceof JsonWebTokenError) {
                const error = new Error('JWT Refresh Token Error')
                error.name = 'JwtRefreshTokenError'
                throw error
            }
            throw error
        }
    }
}