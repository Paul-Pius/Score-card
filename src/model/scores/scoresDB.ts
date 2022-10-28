import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
    {
        email: String,
        week: Number,
        algorithm: Number,
        task: Number,
        assesment: Number,
        agile: Number,
        cummulative: Number
    } 
);

const ScoresModel = mongoose.model("scores", scoreSchema);


export { ScoresModel };