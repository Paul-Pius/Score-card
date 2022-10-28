import express from "express";
import multer from "multer";
import { adminControls } from "../../controller/admin/adminControl";
import { superAdminAuthentication } from "../../middlewares/authentication/authentication";
import { validateLogin } from "../../middlewares/validation/loginvalidator";
import { validateAdminInput } from "../../middlewares/validation/admin-validation/admin-validation";

const adminAPI = express.Router();

//restrict access to only superAdmin
// adminAPI.use("/", superAdminAuthentication);

// Create Admins
adminAPI.post("/create", validateAdminInput, adminControls.createAdmin);

//Edit Admin
adminAPI.put("/edit", validateAdminInput, adminControls.editAdmin);

//Delete Admin;
adminAPI.delete("/delete", adminControls.deleteAdmin);

//Activate admin;
adminAPI.put("/activate", adminControls.setAdminStatus);

//deactivate Admin
adminAPI.put("/deactivate", adminControls.setAdminStatus);

//get all Admin
adminAPI.get("/all-admin", adminControls.getAllAdmin);

//upload display picture ++++++++++++++++++ let field be "img" !important!!!
const storage = multer.memoryStorage();
let uploads = multer({ storage: storage });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

adminAPI.post("/upload", uploads.single("img"), adminControls.savePicture);

//change password
adminAPI.post("/change-password", adminControls.updateAdminPass);

//admin login
adminAPI.post("/login", validateLogin, adminControls.adminLogin)

export { adminAPI };
