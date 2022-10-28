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
exports.user = void 0;
const user_services_1 = require("../../services/user-services/user-services");
const password_1 = require("../../utilities/password");
const token_1 = require("../../utilities/token");
const user = {
    //create new user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                data.password = yield password_1.password.hash(data.password);
                data.token = token_1.token.createToken({ email: data.email });
                yield user_services_1.userServices.createUser(data);
                return res.json({ message: "User Created Successfully" });
            }
            catch (error) {
                return res.status(404).json({ message: "Error: User Not Created" });
            }
        });
    },
    //edit a user
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            if (!user.email) {
                return res.status(404).json({
                    message: "Error: User Not Edited, Please Check The Email and Try Again",
                });
            }
            else {
                try {
                    yield user_services_1.userServices.editUser(user);
                    return res.json({ message: "User Edited Successfully" });
                }
                catch (error) {
                    return res.status(404).json({ message: "Error: User Not Edited" });
                }
            }
        });
    },
    //delete a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            if (!email) {
                return res.status(404).json({
                    message: "Error: User Not Deleted, Please Insert An Email and Try Again",
                });
            }
            else {
                try {
                    yield user_services_1.userServices.deleteUser(email);
                    return res.json({ message: "User Deleted Successfully" });
                }
                catch (error) {
                    return res.status(404).json({ message: "Error: User Does Not Exist" });
                }
            }
        });
    },
    //De-activate a user
    setUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = req.route.path === "/activate" ? true : false;
            const email = req.body.email;
            const result = yield user_services_1.userServices.setUserStatus(email, status);
            if (result) {
                return res.json({ message: "User status updated successfully" });
            }
            else {
                return res.status(404).json({ message: "Error: User Does Not Exist" });
            }
        });
    },
    //User-Login
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password: pass } = req.body;
                const result = yield user_services_1.userServices.login(email, pass);
                // const status: any = await userServices.emailChecker(email)
                // if(!status) return res.status(400).json({message: "wrong email"})
                // const passStatus = await userServices.passwordChecker(pass, status.password)
                // if(!passStatus) return res.status(400).json({message: "wrong password"})
                delete result.password;
                return res.json(result);
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword, passwordConfirm } = req.body;
            if (!newPassword || !passwordConfirm || newPassword !== passwordConfirm) {
                return res.status(401).json({
                    message: "Password not changed, Please check your input fields and make sure its same",
                });
            }
            try {
                const { email } = token_1.token.confirmToken(req.headers.authorization);
                yield user_services_1.userServices.updateUserPassword(email, newPassword);
                return res.status(201).json({ message: 'Password updated successfully' });
            }
            catch (error) {
                return res.status(404).json({ message: "Error: Please try using a different password from your previous pasword Password not updated" });
            }
        });
    }
};
exports.user = user;
