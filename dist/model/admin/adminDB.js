"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPictureModel = exports.AdminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, immutable: true },
    stack: { type: String, required: true },
    squad: { type: Number, required: true },
    isActive: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "Admin",
    },
    password: String,
    token: String,
}, { timestamps: true });
const AdminModel = mongoose_1.default.model("admin", adminSchema);
exports.AdminModel = AdminModel;
//admin profile picture schema
const picture = new mongoose_1.default.Schema({
    email: String,
    fileName: String,
    image: Buffer,
});
const AdminPictureModel = mongoose_1.default.model("pictures", picture);
exports.AdminPictureModel = AdminPictureModel;
