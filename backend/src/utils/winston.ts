import winston from "winston";
import "winston-mongodb";
import dotenv from "dotenv";

dotenv.config();
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: process.env.MONGO_URI as string,
            options: {useUnifiedTopology: true},
            collection: "logs"
        })
    ]
});
export default logger;