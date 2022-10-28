"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminControls = void 0;
const admin_services_1 = require("../../services/admin-services/admin-services");
const password_1 = require("../../utilities/password");
const token_1 = require("../../utilities/token");
const superAdminControls = {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const superAdmin = yield admin_services_1.superAdminServices.getAllSuperAdmins();
            if (Boolean(superAdmin.length)) {
                res.status(400).json({ Error: "Only one Super Admin is required" });
                return;
            }
            data.password = yield password_1.password.hash(data.password);
            data.token = token_1.token.createToken({ role: "superAdmin" });
            return res.status(201).json(yield admin_services_1.superAdminServices.createSuperAdmin(data));
        });
    },
};
exports.superAdminControls = superAdminControls;
