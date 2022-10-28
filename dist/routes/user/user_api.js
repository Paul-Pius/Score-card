"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAPI = void 0;
const express_1 = __importDefault(require("express"));
const userControl_1 = require("../../controller/user/userControl");
const authentication_1 = require("../../middlewares/authentication/authentication");
const loginvalidator_1 = require("../../middlewares/validation/loginvalidator");
const user_validation_1 = require("../../middlewares/validation/user-validation/user-validation");
const userAPI = express_1.default.Router();
exports.userAPI = userAPI;
//give access to only super admin and admin
userAPI.use("/auth", authentication_1.superAdminOrAdminPass);
//create a new user
userAPI.post("/auth/create", userControl_1.user.createUser);
// userAPI.use("/", superAdminOrAdminPass);
//create a new user
userAPI.post("/create", user_validation_1.validateUser, userControl_1.user.createUser);
//edit a user
userAPI.put("/auth/edit", userControl_1.user.editUser);
//deactivate a user
userAPI.put("/auth/deactivate", userControl_1.user.setUserStatus);
//activate a user
userAPI.put("/auth/activate", userControl_1.user.setUserStatus);
//delete a user
userAPI.delete("/auth/delete", userControl_1.user.deleteUser);
//User login
userAPI.post("/login", loginvalidator_1.validateLogin, userControl_1.user.userLogin);
//updatePassword
userAPI.put('/updatePassword', userControl_1.user.updatePassword);
