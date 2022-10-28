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
exports.userServices = void 0;
const userDB_1 = require("../../model/user/userDB");
const password_1 = require("../../utilities/password");
const token_1 = require("../../utilities/token");
const userServices = {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = new userDB_1.UserModel(data);
            return yield users.save();
        });
    },
    editUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userDB_1.UserModel.findOneAndUpdate({ email: data.email }, data);
        });
    },
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userDB_1.UserModel.findOneAndDelete({ email: email });
        });
    },
    setUserStatus(email, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userDB_1.UserModel.findOneAndUpdate({ email: email }, { isActive: status });
        });
    },
    getUser(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userDB_1.UserModel.find({ firstname: firstName, lastname: lastName });
        });
    },
    getuserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userDB_1.UserModel.find({ email: email });
        });
    },
    capitalizeUserName(fullname) {
        let output = [];
        fullname.split(" ").forEach((name) => {
            let x = name.split("");
            x[0] = x[0].toUpperCase();
            output.push(x.join(""));
        });
        return output;
    },
    emailChecker(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userDB_1.UserModel.findOne({ email: email });
        });
    },
    passwordChecker(pass, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield password_1.password.compare(pass, hash);
        });
    },
    login(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = ((yield userDB_1.UserModel.aggregate([
                {
                    $match: {
                        email: email
                    }
                },
                {
                    $project: {
                        firstname: 1,
                        lastname: 1,
                        email: 1,
                        stack: 1,
                        squad: 1,
                        profilePicture: 1,
                        phoneNumber: 1,
                        password: 1,
                        token: 1,
                        role: 1
                    }
                },
            ]))[0]);
            if (!user)
                throw new Error("user does not exist");
            const validPaswword = yield password_1.password.compare(pass, user.password);
            if (!validPaswword)
                throw new Error("Invalid login details");
            const userToken = token_1.token.createToken({ email, role: user.role });
            yield userDB_1.UserModel.findOneAndUpdate({ email }, { token: userToken });
            return Object.assign(Object.assign({}, user), { token: userToken });
        });
    },
    updateUserPassword(email, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let [user] = yield this.getuserByEmail(email);
            if (!user || (yield password_1.password.compare(newPassword, user === null || user === void 0 ? void 0 : user.password))) {
                throw new Error("Please use a password thats different from your previous password");
            }
            else {
                let hashedPassword = yield password_1.password.hash(newPassword);
                return yield userDB_1.UserModel.findOneAndUpdate({ email: email }, { password: hashedPassword });
            }
        });
    },
};
exports.userServices = userServices;
