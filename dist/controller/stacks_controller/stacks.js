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
exports.stackControls = void 0;
const stack_services_1 = require("../../services/stack-services/stack-services");
//-- create a logic for creating a stack --//
const stackControls = {
    createStack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStack = yield stack_services_1.stackServices.createStack(req.body);
                res.status(201).json(newStack);
            }
            catch (error) {
                res.status(404).json({
                    message: "Error creating stack",
                });
            }
        });
    },
    //-- edit a stack --//
    modifystack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            //-- check for case sensitivity for stackName --//
            const stack = body.stackName.split("");
            for (let i = 0; i < stack.length; i++) {
                if (i === 0) {
                    stack[i] = stack[i].toUpperCase();
                }
                else {
                    stack[i] = stack[i].toLowerCase();
                }
            }
            body.stackName = stack.join("");
            //-- end of check for case sensitivity for stackName --//
            const editedStack = yield stack_services_1.stackServices.editStack(body);
            //-- if stack is not found --//
            if (editedStack)
                res.status(200).json(editedStack);
            else
                res.status(404).json({
                    message: "Error editing stack",
                });
        });
    },
    //-- delete a stack --//
    removestack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedStack = yield stack_services_1.stackServices.deleteStack(req.params.stackName);
            //--condition to check if stack is found or not--//
            if (!deletedStack) {
                res.status(404).json({
                    message: "Error deleting stack",
                });
            }
            else {
                res.status(200).json({ message: "Stack Deleted" });
            }
        });
    },
    //-- view all stacks --//
    viewStacks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewStack = yield stack_services_1.stackServices.viewAllStacks();
            if (viewStack)
                res.status(200).json(viewStack);
            else
                res.status(404).json({
                    message: "Error viewing all stacks",
                });
        });
    },
};
exports.stackControls = stackControls;
