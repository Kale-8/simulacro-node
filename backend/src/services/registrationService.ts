import {Registration} from "../models";
import {Event} from "../models";

export async function createRegistration(data: any) {
    const event = await Event.findByPk(data.eventId);
    if (!event) throw {status: 404, message: "Event not found"};
    const count = await Registration.count({where: {eventId: data.eventId, status: "confirmed"}});
    if (count >= event.capacity) throw {status: 400, message: "Event full"};
    return Registration.create(data);
}

export async function listRegistrationsByUser(userId: number) {
    return Registration.findAll({where: {userId}, include: ["event"]});
}

export async function updateRegistration(id: number, data: any) {
    await Registration.update(data, {where: {id}});
    return Registration.findByPk(id);
}

export async function cancelRegistration(id: number) {
    await Registration.update({status: "cancelled"}, {where: {id}});
    return Registration.findByPk(id);
}