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
exports.scoresController = void 0;
const scores_services_1 = require("../../services/scores-services/scores-services");
const scoresController = {
    createScores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cummulativeScore = scores_services_1.scoresServices.calculateCummulative(req.body);
            const scoresData = req.body;
            scoresData.cummulative = cummulativeScore;
            try {
                yield scores_services_1.scoresServices.createScores(scoresData);
                res.status(200).json({
                    message: "Scores added successfully",
                });
            }
            catch (error) {
                res.status(404).json({
                    message: "Error creating scores",
                });
            }
        });
    },
    getScores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const scores = yield scores_services_1.scoresServices.filterScores(req.query);
            if (scores.length === 0)
                return res.json({ message: "No scores found" });
            else
                return res.json(scores);
        });
    },
    getUserScore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = res.locals.user;
            const scores = yield scores_services_1.scoresServices.getScoresAndAverage(email);
            res.status(200).json({
                message: "Success",
                scores
            });
        });
    }
};
exports.scoresController = scoresController;
