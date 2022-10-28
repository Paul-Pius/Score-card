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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const data = {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: 'yusufanka54@gmail.com',
        pass: 'vpJOwbK1AdL0zIQ4'
    },
    secured: false,
};
const transport = nodemailer_1.default.createTransport(data);
function sendMail(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const mail = {
            from: 'Admin <admin@decagon.hq>',
            to: `${email}`,
            subject: 'Email verification',
            text: `Hi ${name}, \n 
        An Admin account has been created for you on scorecard Decagon:\n
        Please, use the following information to sign-in \n
        Email: ${email} \n 
        Password: ${password}\n 
        You can change your Password later 
        \n

        Kind Regards,
        Group 2 Team
        `
        };
        const info = yield transport.sendMail(mail);
        return info;
    });
}
exports.sendMail = sendMail;
