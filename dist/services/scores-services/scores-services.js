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
exports.scoresServices = void 0;
const scoresDB_1 = require("../../model/scores/scoresDB");
const user_services_1 = require("../user-services/user-services");
const scoresServices = {
    createScores(scores) {
        return __awaiter(this, void 0, void 0, function* () {
            const newScores = new scoresDB_1.ScoresModel(scores);
            yield newScores.save();
            return newScores;
        });
    },
    filterScores(requestQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            let { week, name } = requestQuery;
            if (!week && !name)
                return scoresDB_1.ScoresModel.find();
            name = typeof name === "undefined" ? name : user_services_1.userServices.capitalizeUserName(name);
            let email;
            if (name) {
                const user = yield user_services_1.userServices.getUser(name[0], name[1]);
                if (user.length > 0) {
                    email = user[0].email;
                }
            }
            if (week && name) {
                return scoresDB_1.ScoresModel.find({ week: week, email: email });
            }
            if (week)
                return scoresDB_1.ScoresModel.find({ week: week });
            else
                return scoresDB_1.ScoresModel.find({ email: email });
        });
    },
    calculateCummulative(scores) {
        const { algorithm, task, assesment, agile } = scores;
        const cummulativeScore = algorithm * 0.2 + task * 0.4 + assesment * 0.2 + agile * 0.2;
        return cummulativeScore;
    },
    getScoresAndAverage(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let percent;
            const scores = yield scoresDB_1.ScoresModel.find({ email: email });
            if (scores.length === 1) {
                let data = {};
                data.scores = scores;
                data.percent = 0.000;
                return data;
            }
            let [previousScore, currentScore] = scores.slice(-2);
            let algorithmChange = (((Number(currentScore.algorithm) - Number(previousScore.algorithm))) / Number(currentScore.algorithm));
            console.log(algorithmChange.toFixed(3));
            let taskChange = (((Number(currentScore.task) - Number(previousScore.task))) / Number(currentScore.task));
            console.log(taskChange.toFixed(3));
            let assesmentChange = (((Number(currentScore.assesment) - Number(previousScore.assesment))) / Number(currentScore.assesment));
            console.log(assesmentChange.toFixed(3));
            let agileChange = (((Number(currentScore.agile) - Number(previousScore.agile))) / Number(currentScore.agile));
            console.log(agileChange.toFixed(3));
            let cummulativeChange = (((Number(currentScore.cummulative) - Number(previousScore.cummulative))) / Number(currentScore.cummulative));
            console.log(cummulativeChange.toFixed(3));
            let result = Object.assign(Object.assign({}, currentScore), { taskChange: taskChange.toFixed(3), algorithmChange: algorithmChange.toFixed(3), assesmentChange: assesmentChange.toFixed(3), agileChange: agileChange.toFixed(3), cummulativeChange: cummulativeChange.toFixed(3) });
            return result;
        });
    }
};
exports.scoresServices = scoresServices;
