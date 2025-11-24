import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
    logging: false,
    define: {
        underscored: true
    }
});
export {sequelize};