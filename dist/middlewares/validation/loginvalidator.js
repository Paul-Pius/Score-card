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
exports.validateSignUp = exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
//User-Login validation 
function validateLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(2).required()
        });
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            res.status(400).json({ message: `${error.details[0].message}` });
        }
    });
}
exports.validateLogin = validateLogin;
//SuperAdmin-Signup validation
function validateSignUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            firstName: joi_1.default.string().required().label("firstName"),
            lastName: joi_1.default.string().required().label("lastName"),
            email: joi_1.default.string().email().required(),
            password: (0, joi_password_complexity_1.default)().required(),
            confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required()
        });
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            res.status(400).json(200);
        }
    });
}
exports.validateSignUp = validateSignUp;
