import {Request, Response, NextFunction} from "express";
import * as registrationService from "../services/registrationService";
import {Log} from "../models/Log";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const data = {userId: req.user.id, eventId: req.body.eventId, status: "pending"};
        const reg = await registrationService.createRegistration(data);
        await Log.create({action: "register_event", userId: req.user.id, resource: `registration:${reg.id}`});
        res.json(reg);
    } catch (e) {
        next(e);
    }
}

export async function myRegistrations(req: Request, res: Response, next: NextFunction) {
    try {
        const regs = await registrationService.listRegistrationsByUser(req.user.id);
        res.json(regs);
    } catch (e) {
        next(e);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const reg = await registrationService.updateRegistration(Number(req.params.id), req.body);
        res.json(reg);
    } catch (e) {
        next(e);
    }
}

export async function cancel(req: Request, res: Response, next: NextFunction) {
    try {
        const reg = await registrationService.cancelRegistration(Number(req.params.id));
        res.json({ok: true});
    } catch (e) {
        next(e);
    }
}