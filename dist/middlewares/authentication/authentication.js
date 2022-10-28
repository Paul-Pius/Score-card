"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userScoresPass = exports.superAdminOrAdminPass = exports.superAdminAuthentication = void 0;
const token_1 = require("../../utilities/token");
function superAdminAuthentication(req, res, next) {
    const authorization = req.headers.authorization;
    try {
        const check = token_1.token.confirmToken(authorization);
        console.log(authorization);
        if (check.role === "superAdmin")
            next();
    }
    catch (error) {
        res.status(401).json({ Error: "Access Denied" });
    }
}
exports.superAdminAuthentication = superAdminAuthentication;
function superAdminOrAdminPass(req, res, next) {
    const authorization = req.headers.authorization;
    try {
        const check = token_1.token.confirmToken(authorization);
        if (check.role.toLowerCase() === "admin" || check.role === "superAdmin")
            next();
    }
    catch (error) {
        res.status(401).json({ Error: "Access Denied" });
    }
}
exports.superAdminOrAdminPass = superAdminOrAdminPass;
function userScoresPass(req, res, next) {
    const authorization = req.headers.authorization;
    try {
        const check = token_1.token.confirmToken(authorization);
        res.locals.user = check;
        next();
    }
    catch (error) {
        res.status(401).json({ Error: "Access Denied" });
    }
}
exports.userScoresPass = userScoresPass;
