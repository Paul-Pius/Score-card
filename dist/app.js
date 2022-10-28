"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const adminAPI_1 = require("./routes/admin/adminAPI");
const scoresAPI_1 = require("./routes/scores/scoresAPI");
const stack_1 = require("./routes/stacks/stack");
const superAdmin_api_1 = require("./routes/super_admin/superAdmin_api");
const user_api_1 = require("./routes/user/user_api");
const app = (0, express_1.default)();
// create a database connection
//no need for body-parser....automatically parse
//all incoming json requests throughout the whole app
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET, POST, PUT, DELETE"]
}));
app.use(express_1.default.json());
// routers start
//users route
app.use("/user", user_api_1.userAPI);
//superAdmin route
app.use("/superadmin", superAdmin_api_1.superAdminAPI);
//stack route
app.use("/stack", stack_1.stackRoutes);
//admin route
app.use("/admin", adminAPI_1.adminAPI);
//score route
app.use('/scores', scoresAPI_1.scoresRoutes);
exports.default = app;
