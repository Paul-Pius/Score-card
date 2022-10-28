"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminAPI = void 0;
const express_1 = __importDefault(require("express"));
const superAdminControl_1 = require("../../controller/super_admin/superAdminControl");
const loginvalidator_1 = require("../../middlewares/validation/loginvalidator");
const superAdminAPI = express_1.default.Router();
exports.superAdminAPI = superAdminAPI;
//implement routes below
superAdminAPI.post('/create', loginvalidator_1.validateSignUp, superAdminControl_1.superAdminControls.create);
