import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            userInfo?: { id: number, name: string, email: string, iat: number, exp?: number };
        }
    }
}
