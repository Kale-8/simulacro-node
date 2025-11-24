import api, {setAuth} from "./api.js";

export async function register(data) {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export async function login(data) {
    const res = await api.post("/auth/login", data);
    return res.data;
}

export function saveToken(token) {
    localStorage.setItem("token", token);
    setAuth(token);
}

export function loadToken() {
    const t = localStorage.getItem("token");
    if (t) setAuth(t);
    return t;
}

export function logout() {
    localStorage.removeItem("token");
    setAuth(null);
}

export function getUserFromToken() {
    const t = localStorage.getItem("token");
    if (!t) return null;
    return JSON.parse(atob(t.split(".")[1]));
}