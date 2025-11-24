import {Event} from "../models";
import {Op} from "sequelize";

export async function createEvent(data: any) {
    return Event.create(data);
}

export async function listEvents(query: any) {
    const where: any = {};
    if (query.location) where.location = {[Op.like]: `%${query.location}%`};
    if (query.q) where.title = {[Op.like]: `%${query.q}%`};
    if (query.future === "true") where.date = {[Op.gt]: new Date()};
    return Event.findAll({where});
}

export async function getEvent(id: number) {
    return Event.findByPk(id);
}

export async function updateEvent(id: number, data: any) {
    await Event.update(data, {where: {id}});
    return getEvent(id);
}

export async function deleteEvent(id: number) {
    return Event.destroy({where: {id}});
}