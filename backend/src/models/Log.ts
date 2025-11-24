import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    action: String,
    userId: Number,
    resource: String,
    date: {type: Date, default: Date.now}
});
const Log = mongoose.model("Log", Schema);
export {Log};