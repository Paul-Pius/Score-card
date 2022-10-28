"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../env"));
const token = {
    createToken(payload) {
        return jsonwebtoken_1.default.sign(payload, `${env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.JWT_SECRET}`);
    },
    confirmToken(bearerAuth) {
        const [, token] = bearerAuth.split(" ");
        return jsonwebtoken_1.default.verify(token, `${env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.JWT_SECRET}`);
    },
};
exports.token = token;
