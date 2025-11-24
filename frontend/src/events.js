import api from "./api.js";

export async function listEvents(filters = {}) {
    const res = await api.get("/events", {params: filters});
    return res.data;
}

export async function getEvent(id) {
    const res = await api.get(`/events/${id}`);
    return res.data;
}