import express from "express";
import { scoresController } from "../../controller/scores/scoresController";
import { superAdminOrAdminPass, userScoresPass } from "../../middlewares/authentication/authentication";


const scoresRoutes = express.Router();

//allow only superAdmin or admin
scoresRoutes.use("/", superAdminOrAdminPass);

//post scores point
scoresRoutes.post("/addscores", scoresController.createScores);

//get scores point
scoresRoutes.get("/getscores", scoresController.getScores);

scoresRoutes.get('/get-score', userScoresPass, scoresController.getUserScore);
export { scoresRoutes };
