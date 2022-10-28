"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    stack: {
        type: String,
        required: true
    },
    squad: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    profilePicture: {
        type: String,
        default: `url('../img/add-dp-icon.png')`,
    },
    phoneNumber: {
        type: String,
        default: "0",
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        default: ""
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
}, { timestamps: true });
const UserModel = mongoose_1.default.model("users", userSchema);
exports.UserModel = UserModel;
