import {Request, Response, NextFunction} from "express";
import * as userService from "../services/userService";

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.listUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.getUser(Number(req.params.id));
        res.json(user);
    } catch (e) {
        next(e);
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.updateUser(Number(req.params.id), req.body);
        res.json(user);
    } catch (e) {
        next(e);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.deleteUser(Number(req.params.id));
        res.json({ok: true});
    } catch (e) {
        next(e);
    }
}