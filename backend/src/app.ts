import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import eventRoutes from "./routes/events";
import regRoutes from "./routes/registrations";
import {errorHandler} from "./middlewares/errorHandler";
import "./config/mongoose";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_ORIGIN || !origin}));//check
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", regRoutes);
app.use(errorHandler);
export default app;