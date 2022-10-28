"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoresModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const scoreSchema = new mongoose_1.default.Schema({
    email: String,
    week: Number,
    algorithm: Number,
    task: Number,
    assesment: Number,
    agile: Number,
    cummulative: Number
});
const ScoresModel = mongoose_1.default.model("scores", scoreSchema);
exports.ScoresModel = ScoresModel;
