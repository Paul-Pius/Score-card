"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const stacks_1 = require("../../controller/stacks_controller/stacks");
const authentication_1 = require("../../middlewares/authentication/authentication");
//-- create CRUD operations routes for stack--//
const stackRoutes = express_1.default.Router();
exports.stackRoutes = stackRoutes;
//stack authentication
stackRoutes.use("/", authentication_1.superAdminAuthentication);
//-- create or post all stacks --//
stackRoutes.post("/create", stacks_1.stackControls.createStack);
//-- edit a stack --//
stackRoutes.put("/edit", stacks_1.stackControls.modifystack);
//-- delete a stack --//
stackRoutes.delete("/delete/:stackName", stacks_1.stackControls.removestack);
//-- view all stacks --//
stackRoutes.get("/get-stacks", stacks_1.stackControls.viewStacks);
