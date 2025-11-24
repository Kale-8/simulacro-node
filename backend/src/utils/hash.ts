import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
    const s = await bcrypt.genSalt(10);
    return bcrypt.hash(password, s);
}

export async function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}