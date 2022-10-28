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
exports.stackServices = void 0;
const stacks_model_1 = require("../../model/stacks_model/stacks_model");
const stackServices = {
    createStack(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const stack = new stacks_model_1.StackModel(data);
            return yield stack.save();
        });
    },
    //-- edit a stack --//
    editStack(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stacks_model_1.StackModel.findOneAndUpdate({ stackName: data.stackName }, data);
        });
    },
    //-- delete a stack --//
    deleteStack(stackName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stacks_model_1.StackModel.findOneAndDelete({ stackName: stackName });
        });
    },
    //-- view all stacks --//
    viewAllStacks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stacks_model_1.StackModel.find();
        });
    },
};
exports.stackServices = stackServices;
