import {Request, Response, NextFunction} from "express";
import * as eventService from "../services/eventService";
import {Log} from "../models/Log";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const data = {...req.body, organizerId: req.user.id};
        const event = await eventService.createEvent(data);
        await Log.create({action: "create_event", userId: req.user.id, resource: `event:${event.id}`});
        res.json(event);
    } catch (e) {
        next(e);
    }
}

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        const events = await eventService.listEvents(req.query);
        res.json(events);
    } catch (e) {
        next(e);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const event = await eventService.getEvent(Number(req.params.id));
        res.json(event);
    } catch (e) {
        next(e);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const event = await eventService.updateEvent(Number(req.params.id), req.body);
        res.json(event);
    } catch (e) {
        next(e);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        await eventService.deleteEvent(Number(req.params.id));
        res.json({ok: true});
    } catch (e) {
        next(e);
    }
}