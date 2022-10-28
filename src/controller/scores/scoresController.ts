import express from "express";
import { scoresServices } from "../../services/scores-services/scores-services";

const scoresController = {
  async createScores(req: express.Request, res: express.Response) {
    const cummulativeScore = scoresServices.calculateCummulative(req.body);
    const scoresData = req.body;
    scoresData.cummulative = cummulativeScore;
    try {
      await scoresServices.createScores(scoresData);
      res.status(200).json({
        message: "Scores added successfully",
      });
    } catch (error) {
      res.status(404).json({
        message: "Error creating scores",
      });
    }
  },
  async getScores(req: express.Request, res: express.Response) {
    const scores = await scoresServices.filterScores(req.query);
    if (scores.length === 0) return res.json({ message: "No scores found" });
    else return res.json(scores);
  },
  async getUserScore(req: express.Request, res: express.Response) {
    const {email} = res.locals.user;
    const scores = await scoresServices.getScoresAndAverage(email);

    res.status(200).json({
      message: "Success",
      scores});
    
}

}

export { scoresController };
