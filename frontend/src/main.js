import {register, login, saveToken, loadToken, logout, getUserFromToken} from "./auth.js";
import {listEvents} from "./events.js";
import {createEvent} from "./createEvent.js";
import {registerToEvent, myRegistrations} from "./registrations.js";

loadToken();
const view = document.getElementById("view");
document.getElementById("btn-home").addEventListener("click", renderEvents);
document.getElementById("btn-register").addEventListener("click", renderRegister);
document.getElementById("btn-login").addEventListener("click", renderLogin);
document.getElementById("btn-create").addEventListener("click", renderCreateEvent);
document.getElementById("btn-logout").addEventListener("click", async () => {
    logout();
    await renderEvents();
});
document.getElementById("btn-myregs").addEventListener("click", renderMyRegistrations);

async function renderEvents() {
    const html = document.createElement("div");
    html.className = "container";
    const events = await listEvents();
    html.innerHTML = "<h2>Events</h2>";
    events.forEach(e => {
        const el = document.createElement("div");
        el.className = "event";
        el.innerHTML = `<h3>${e.title}</h3><div class="small">Date: ${new Date(e.date).toLocaleString()} | Location: ${e.location}</div><p>${e.description || ""}</p><button data-id="${e.id}" class="btn-register">Register</button>`;
        html.appendChild(el);
    });
    view.innerHTML = "";
    view.appendChild(html);
    document.querySelectorAll(".btn-register").forEach(btn => btn.addEventListener("click", async ev => {
        const id = Number(ev.target.dataset.id);
        try {
            await registerToEvent(id);
            alert("Registered");
        } catch (e) {
            alert(e.response?.data?.message || "Error");
        }
    }));
}

function renderRegister() {
    const html = document.createElement("div");
    html.className = "container";
    html.innerHTML = `<h2>Register</h2><input id="r-name" placeholder="Name"><input id="r-email" placeholder="Email"><input id="r-pass" type="password" placeholder="Password"><select id="r-role"><option value="participant">Participant</option><option value="organizer">Organizer</option></select><button id="r-submit">Submit</button>`;
    view.innerHTML = "";
    view.appendChild(html);
    document.getElementById("r-submit").addEventListener("click", async () => {
        const data = {
            name: document.getElementById("r-name").value,
            email: document.getElementById("r-email").value,
            password: document.getElementById("r-pass").value,
            role: document.getElementById("r-role").value
        };
        try {
            const res = await register(data);
            saveToken(res.token);
            alert("Registered and logged");
            await renderEvents();
        } catch (e) {
            alert(e.response?.data?.message || "Error");
        }
    });
}

function renderLogin() {
    const html = document.createElement("div");
    html.className = "container";
    html.innerHTML = `<h2>Login</h2><input id="l-email" placeholder="Email"><input id="l-pass" placeholder="Password" type="password"><button id="l-submit">Login</button>`;
    view.innerHTML = "";
    view.appendChild(html);
    document.getElementById("l-submit").addEventListener("click", async () => {
        const data = {
            email: document.getElementById("l-email").value,
            password: document.getElementById("l-pass").value
        };
        try {
            const res = await login(data);
            saveToken(res.token);
            alert("Logged");
            await renderEvents();
        } catch (e) {
            alert(e.response?.data?.message || "Error");
        }
    });
}

function renderCreateEvent() {
    const user = getUserFromToken();
    if (!user || (user.role !== "organizer" && user.role !== "admin")) return alert("Only organizer");
    const html = document.createElement("div");
    html.className = "container";
    html.innerHTML = `<h2>Create Event</h2><input id="e-title" placeholder="Title"><textarea id="e-desc" placeholder="Description"></textarea><input id="e-date" placeholder="YYYY-MM-DDTHH:mm"><input id="e-loc" placeholder="Location"><input id="e-cap" type="number" placeholder="Capacity"><button id="e-submit">Create</button>`;
    view.innerHTML = "";
    view.appendChild(html);
    document.getElementById("e-submit").addEventListener("click", async () => {
        const data = {
            title: document.getElementById("e-title").value,
            description: document.getElementById("e-desc").value,
            date: document.getElementById("e-date").value,
            location: document.getElementById("e-loc").value,
            capacity: Number(document.getElementById("e-cap").value)
        };
        try {
            await createEvent(data);
            alert("Created");
            await renderEvents();
        } catch (e) {
            alert(e.response?.data?.message || "Error");
        }
    });
}

async function renderMyRegistrations() {
    const user = getUserFromToken();
    if (!user) return alert("Login first");
    try {
        const regs = await myRegistrations();
        const html = document.createElement("div");
        html.className = "container";
        html.innerHTML = "<h2>My Registrations</h2>";
        regs.forEach(r => {
            const el = document.createElement("div");
            el.className = "event";
            el.innerHTML = `<div>${r.event.title} | ${r.status}</div>`;
            html.appendChild(el);
        });
        view.innerHTML = "";
        view.appendChild(html);
    } catch (e) {
        alert(e.response?.data?.message || "Error");
    }
}

await renderEvents();