import express from "express";
import { superAdminControls } from "../../controller/super_admin/superAdminControl";
import { validateSignUp } from "../../middlewares/validation/loginvalidator";



const superAdminAPI = express.Router();

//implement routes below

superAdminAPI.post('/create', validateSignUp, superAdminControls.create);

export {superAdminAPI}