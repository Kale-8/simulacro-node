import api from "./api.js";

export async function registerToEvent(eventId) {
    const res = await api.post("/registrations", {eventId});
    return res.data;
}

export async function myRegistrations() {
    const res = await api.get("/registrations/me");
    return res.data;
}