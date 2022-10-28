"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connector_1 = require("./database/connector");
const env_1 = __importDefault(require("./env"));
(0, connector_1.connectDB)();
const port = (env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.PORT) || 3000;
app_1.default.listen(port, () => console.log(`server is running on PORT: ${port}`));
