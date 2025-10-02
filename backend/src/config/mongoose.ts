import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoUri = process.env.MONGO_URI as string;
(async () => await mongoose.connect(mongoUri))();
export default mongoose;