import {User} from "../models";
import {hashPassword, comparePassword} from "../utils/hash";
import {signToken} from "../utils/jwt";

export async function registerUser(data: { name: string, email: string, password: string, role?: string }) {
    const existing = await User.findOne({where: {email: data.email}});
    if (existing) throw {status: 400, message: "Email already exists"};
    const password = await hashPassword(data.password);
    const user = await User.create({name: data.name, email: data.email, password, role: data.role || "participant"});
    const token = signToken({id: user.id, role: user.role});
    return {user, token};
}

export async function loginUser(data: { email: string, password: string }) {
    const user = await User.findOne({where: {email: data.email}});
    if (!user) throw {status: 401, message: "Invalid credentials"};
    const ok = await comparePassword(data.password, user.password);
    if (!ok) throw {status: 401, message: "Invalid credentials"};
    const token = signToken({id: user.id, role: user.role});
    return {user, token};
}