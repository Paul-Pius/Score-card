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
exports.adminControls = void 0;
const admin_services_1 = require("../../services/admin-services/admin-services");
const password_1 = require("../../utilities/password");
const adminControls = {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const adminBody = yield admin_services_1.adminServices.createAdmin(req.body);
                return res.json(adminBody);
            }
            catch (err) {
                return res
                    .status(409)
                    .json({ message: "could not create Admin, email already exists" });
            }
        });
    },
    editAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminBody = yield admin_services_1.adminServices.editAdmin(req.body);
                return res.json(adminBody);
            }
            catch (err) {
                return res.status(409).json({ message: "could not edit Admin" });
            }
        });
    },
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const admin = yield admin_services_1.adminServices.removeAdmin(email);
            if (!admin) {
                return res.status(409).json({ Error: "This Admin does not exist" });
            }
            return res.json({ message: "Admin successfully deleted" });
        });
    },
    setAdminStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = req.route.path === "/activate" ? true : false;
            try {
                const email = req.body.email;
                const admin = yield admin_services_1.adminServices.setAdminStatus(email, status);
                res.json({ message: "Admin status updated successfully" });
            }
            catch (err) {
                return res.status(409).json({ Error: "Could not complete this action" });
            }
        });
    },
    getAllAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_services_1.adminServices.getAllAdmin();
            if (admin.length === 0) {
                return res.json({ message: "No Admin Yet" });
            }
            return res.json(admin);
        });
    },
    savePicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let image = req.file;
            const { originalname, buffer } = image;
            const { email } = req.body;
            const data = {
                email: email,
                fileName: originalname,
                image: buffer,
            };
            try {
                yield admin_services_1.adminServices.saveAdminPicture(data);
                return res.json({
                    message: "Admin Profile Picture successfully uploaded",
                });
            }
            catch (err) {
                return res
                    .status(409)
                    .json({ message: "Could not complete this action" });
            }
        });
    },
    updateAdminPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req)
                const { email, password: pass } = req.body;
                //use this later
                const status = yield admin_services_1.adminServices.findOneAdmin(email);
                if (status.length === 0) {
                    return res.status(409).json({ message: "Could not find this admin" });
                }
                yield admin_services_1.adminServices.updateAdminPassword(email, yield password_1.password.hash(pass));
                res.json({
                    message: "Admin Password successfully uploaded",
                });
            }
            catch (error) {
                return res
                    .status(409)
                    .json({ message: "Could not update password for this admin" });
            }
        });
    },
    //admin-Login
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password: pass } = req.body;
                const result = yield admin_services_1.adminServices.login(req.body);
                delete result.password;
                return res.json(result);
            }
            catch (error) {
                return res.send(error);
            }
        });
    }
};
exports.adminControls = adminControls;
