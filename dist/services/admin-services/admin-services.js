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
exports.adminServices = exports.superAdminServices = void 0;
const adminDB_1 = require("../../model/admin/adminDB");
const superAdminDB_1 = require("../../model/super_admin/superAdminDB");
const emailing_1 = require("../../utilities/emailing");
const password_1 = require("../../utilities/password");
const token_1 = require("../../utilities/token");
const superAdminServices = {
    createSuperAdmin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const superAdmin = new superAdminDB_1.SuperAdminModel(data);
            return superAdmin.save();
        });
    },
    getAllSuperAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return superAdminDB_1.SuperAdminModel.find();
        });
    },
};
exports.superAdminServices = superAdminServices;
const adminServices = {
    createAdmin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            //generate random pass;
            const randomPass = yield password_1.password.random();
            const data = Object.assign(adminData);
            data.password = randomPass;
            // emailing insertion
            const name = adminData.firstname;
            (0, emailing_1.sendMail)(name, data.email, randomPass);
            data.token = token_1.token.createToken({ role: "admin" });
            data.password = yield password_1.password.hash(data.password);
            const admin = new adminDB_1.AdminModel(data);
            return yield admin.save();
        });
    },
    getAllAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return adminDB_1.AdminModel.find();
        });
    },
    editAdmin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            //destructure adminBody;
            const { email } = adminData;
            const data = yield adminDB_1.AdminModel.findOneAndUpdate({ email: email }, adminData);
            return data;
        });
    },
    removeAdmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            //find admin by id;
            const admin = yield adminDB_1.AdminModel.findOneAndRemove({ email: email });
            return admin;
        });
    },
    setAdminStatus(email, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return adminDB_1.AdminModel.findOneAndUpdate({ email: email }, { isActive: status });
        });
    },
    saveAdminPicture(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const pic = new adminDB_1.AdminPictureModel(data);
            return yield pic.save();
        });
    },
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = (yield adminDB_1.AdminModel.aggregate([
                {
                    $match: {
                        email: data.email
                    }
                },
                {
                    $project: {
                        firstname: 1,
                        lastname: 1,
                        email: 1,
                        stack: 1,
                        squad: 1,
                        password: 1
                    }
                },
            ]))[0];
            if (!admin)
                throw Error("admin does not exist");
            const validPassword = yield password_1.password.compare(data.password, admin.password);
            if (!validPassword)
                throw Error("Invalid password");
            const adminToken = token_1.token.createToken({ email: data.email, role: admin.role });
            yield adminDB_1.AdminModel.findOneAndUpdate({ email: data.email }, { token: adminToken });
            const result = Object.assign(Object.assign({}, admin), { token: adminToken });
            return result;
        });
    },
    updateAdminPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield adminDB_1.AdminModel.findOneAndUpdate({ email: email }, { password: password });
        });
    },
    findOneAdmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield adminDB_1.AdminModel.find({ email: email });
        });
    },
    emailChecker(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield adminDB_1.AdminModel.findOne({ email: email });
        });
    },
    passwordChecker(pass, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield password_1.password.compare(pass, hash);
        });
    }
};
exports.adminServices = adminServices;
