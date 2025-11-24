import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: any) {
    return jwt.sign(payload, SECRET, {expiresIn: "7d"});
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}