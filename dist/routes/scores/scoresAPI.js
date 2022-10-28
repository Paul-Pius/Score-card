"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoresRoutes = void 0;
const express_1 = __importDefault(require("express"));
const scoresController_1 = require("../../controller/scores/scoresController");
const authentication_1 = require("../../middlewares/authentication/authentication");
const scoresRoutes = express_1.default.Router();
exports.scoresRoutes = scoresRoutes;
//allow only superAdmin or admin
scoresRoutes.use("/", authentication_1.superAdminOrAdminPass);
//post scores point
scoresRoutes.post("/addscores", scoresController_1.scoresController.createScores);
//get scores point
scoresRoutes.get("/getscores", scoresController_1.scoresController.getScores);
scoresRoutes.get('/get-score', authentication_1.userScoresPass, scoresController_1.scoresController.getUserScore);
