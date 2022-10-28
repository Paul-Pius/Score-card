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
exports.validateUser = void 0;
const Joi_1 = __importDefault(require("Joi"));
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = Joi_1.default.object({
            firstname: Joi_1.default.string(),
            lastname: Joi_1.default.string(),
            email: Joi_1.default.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "dev"] },
            }),
            stack: Joi_1.default.string(),
            squad: Joi_1.default.number(),
            phoneNumber: Joi_1.default.string(),
            password: Joi_1.default.string(),
        });
        try {
            const value = yield schema.validateAsync(req.body);
            next();
        }
        catch (err) {
            res.status(404).json({ Error: `${err.details[0].message}` });
        }
    });
}
exports.validateUser = validateUser;
