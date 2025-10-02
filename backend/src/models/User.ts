import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/db";

class User extends Model {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    role!: string;
}

User.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.ENUM("admin", "participant", "organizer"), defaultValue: "participant"}
}, {sequelize, modelName: "user", tableName: "users", timestamps: true});
export {User};