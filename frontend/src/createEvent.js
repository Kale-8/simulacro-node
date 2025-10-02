import api from "./api.js";

export async function createEvent(data) {
    const res = await api.post("/events", data);
    return res.data;
}