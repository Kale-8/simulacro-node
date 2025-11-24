import {Request, Response, NextFunction} from "express";
import * as authService from "../services/authService";
import {Log} from "../models/Log";
import logger from "../utils/winston";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.registerUser(req.body);
        await Log.create({action: "register", userId: result.user.id, resource: "user"});
        logger.info("register", {userId: result.user.id});
        res.json(result);
    } catch (e) {
        next(e);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await authService.loginUser(req.body);
        await Log.create({action: "login", userId: result.user.id, resource: "user"});
        logger.info("login", {userId: result.user.id});
        res.json(result);
    } catch (e) {
        next(e);
    }
}