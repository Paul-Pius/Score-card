"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../env"));
const connectDB = () => {
    mongoose_1.default.connect(`${env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.DB_URI}`, connectionCallback);
};
exports.connectDB = connectDB;
function connectionCallback(err) {
    if (err)
        console.log(err);
    else
        console.log("connected to mongoDB Atlas successfully");
}
