import {User} from "../models";

export async function listUsers() {
    return User.findAll();
}

export async function getUser(id: number) {
    return User.findByPk(id);
}

export async function createUser(data: any) {
    return User.create(data);
}

export async function updateUser(id: number, data: any) {
    await User.update(data, {where: {id}});
    return getUser(id);
}

export async function deleteUser(id: number) {
    return User.destroy({where: {id}});
}

export async function findUsersByRoles(roles: string[]) {
    return User.findAll({where: {role: roles}});
}