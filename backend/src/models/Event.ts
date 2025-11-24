import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/db";

class Event extends Model {
    id!: number;
    title!: string;
    description!: string;
    date!: Date;
    location!: string;
    capacity!: number;
    organizerId!: number;
}

Event.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    date: {type: DataTypes.DATE, allowNull: false},
    location: {type: DataTypes.STRING, allowNull: false},
    capacity: {type: DataTypes.INTEGER, allowNull: false},
    organizerId: {type: DataTypes.INTEGER, allowNull: false}
}, {sequelize, modelName: "event", tableName: "events", timestamps: false});
export {Event};