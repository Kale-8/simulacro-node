import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/db";

class Registration extends Model {
    id!: number;
    status!: string;
    userId!: number;
    eventId!: number;
}

Registration.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    status: {type: DataTypes.ENUM("pending", "confirmed", "cancelled"), defaultValue: "pending"},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    eventId: {type: DataTypes.INTEGER, allowNull: false}
}, {sequelize, modelName: "registration", tableName: "registrations", timestamps: false});
export {Registration};