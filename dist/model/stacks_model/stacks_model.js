"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//--create a schema for stack--//
const stacKSchema = new mongoose_1.default.Schema({
    stackName: String,
    stackDescription: String,
}, { timestamps: true });
const StackModel = mongoose_1.default.model('stack', stacKSchema);
exports.StackModel = StackModel;
