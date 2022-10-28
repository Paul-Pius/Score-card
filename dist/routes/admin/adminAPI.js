"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAPI = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const adminControl_1 = require("../../controller/admin/adminControl");
const loginvalidator_1 = require("../../middlewares/validation/loginvalidator");
const admin_validation_1 = require("../../middlewares/validation/admin-validation/admin-validation");
const adminAPI = express_1.default.Router();
exports.adminAPI = adminAPI;
//restrict access to only superAdmin
// adminAPI.use("/", superAdminAuthentication);
// Create Admins
adminAPI.post("/create", admin_validation_1.validateAdminInput, adminControl_1.adminControls.createAdmin);
//Edit Admin
adminAPI.put("/edit", admin_validation_1.validateAdminInput, adminControl_1.adminControls.editAdmin);
//Delete Admin;
adminAPI.delete("/delete", adminControl_1.adminControls.deleteAdmin);
//Activate admin;
adminAPI.put("/activate", adminControl_1.adminControls.setAdminStatus);
//deactivate Admin
adminAPI.put("/deactivate", adminControl_1.adminControls.setAdminStatus);
//get all Admin
adminAPI.get("/all-admin", adminControl_1.adminControls.getAllAdmin);
//upload display picture ++++++++++++++++++ let field be "img" !important!!!
const storage = multer_1.default.memoryStorage();
let uploads = (0, multer_1.default)({ storage: storage });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
adminAPI.post("/upload", uploads.single("img"), adminControl_1.adminControls.savePicture);
//change password
adminAPI.post("/change-password", adminControl_1.adminControls.updateAdminPass);
//admin login
adminAPI.post("/login", loginvalidator_1.validateLogin, adminControl_1.adminControls.adminLogin);
