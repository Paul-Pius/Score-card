"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const superAdminSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "superAdmin",
    },
    token: String
}, { timestamps: true });
const SuperAdminModel = mongoose_1.default.model("superAdmin", superAdminSchema);
exports.SuperAdminModel = SuperAdminModel;
