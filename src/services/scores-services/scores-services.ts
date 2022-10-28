import { ScoresModel } from "../../model/scores/scoresDB";
import { userServices } from "../user-services/user-services";

const scoresServices = {
  async createScores(scores: any) {
    const newScores = new ScoresModel(scores);
    await newScores.save();
    return newScores;
  },

  async filterScores(requestQuery: any) {
    let { week, name } = requestQuery;
    if(!week && !name) return ScoresModel.find();
    name = typeof name === "undefined" ? name : userServices.capitalizeUserName(name);
    let email;
    if (name) {
      const user = await userServices.getUser(name[0], name[1]);
      if (user.length > 0) {
        email = user[0].email;
      }
    }
    if (week && name) {
      return ScoresModel.find({ week: week, email: email });
    }
    if (week) return ScoresModel.find({ week: week });
    else return ScoresModel.find({ email: email });
  },

  calculateCummulative(scores: any) {
    const { algorithm, task, assesment, agile } = scores;
    const cummulativeScore =
      algorithm * 0.2 + task * 0.4 + assesment * 0.2 + agile * 0.2;
    return cummulativeScore;
  },
  async getScoresAndAverage(email: string){
     let percent;
  const scores = await ScoresModel.find({ email: email });
  if(scores.length === 1){
    let data : any= {}
    data.scores = scores;
    data.percent = 0.000;
    return data;
  }
  let [previousScore, currentScore ]= scores.slice(-2);
  let algorithmChange =  (((Number(currentScore.algorithm) - Number(previousScore.algorithm))) / Number(currentScore.algorithm));
  console.log(algorithmChange.toFixed(3));
  let taskChange = (((Number(currentScore.task) - Number(previousScore.task))) / Number(currentScore.task));
  console.log(taskChange.toFixed(3));
  let assesmentChange = (((Number(currentScore.assesment) - Number(previousScore.assesment))) / Number(currentScore.assesment));
  console.log(assesmentChange.toFixed(3));
  let agileChange = (((Number(currentScore.agile) - Number(previousScore.agile))) / Number(currentScore.agile));
  console.log(agileChange.toFixed(3));
  let cummulativeChange = (((Number(currentScore.cummulative) - Number(previousScore.cummulative))) / Number(currentScore.cummulative));
  console.log(cummulativeChange.toFixed(3));
  let result = {...currentScore, taskChange: taskChange.toFixed(3), algorithmChange: algorithmChange.toFixed(3), assesmentChange: assesmentChange.toFixed(3), agileChange: agileChange.toFixed(3), cummulativeChange: cummulativeChange.toFixed(3)};
  return result;
  }
};
export { scoresServices };
