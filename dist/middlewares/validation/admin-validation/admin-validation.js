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
exports.validateAdminInput = void 0;
const joi_1 = __importDefault(require("joi"));
function validateAdminInput(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //define the schema;
        const admin = req.body;
        const schema = joi_1.default.object({
            id: joi_1.default.string(),
            firstname: joi_1.default.string().required(),
            lastname: joi_1.default.string().required(),
            email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } }),
            stack: joi_1.default.string().required(),
            squad: joi_1.default.string().required(),
            role: joi_1.default.string().required()
        });
        const isValid = schema.validate(admin);
        if (isValid.error) {
            return res.json(isValid.error.details[0].message);
        }
        next();
    });
}
exports.validateAdminInput = validateAdminInput;
