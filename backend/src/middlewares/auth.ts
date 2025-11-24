import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const auth = req.headers.authorization;
        if (!auth) throw {status: 401, message: "No token"};
        const parts = auth.split(" ");
        if (parts.length !== 2) throw {status: 401, message: "Invalid token"};
        req.user = verifyToken(parts[1]);
        next();
    } catch (e) {
        next(e);
    }
}

export function requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next({status: 401, message: "Unauthorized"});
        if (req.user.role !== role && req.user.role !== "admin") return next({status: 403, message: "Forbidden"});
        next();
    };
}