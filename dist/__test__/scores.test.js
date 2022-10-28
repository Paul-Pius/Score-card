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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const admin_1 = require("../database/fakeDB/admin");
const env_1 = __importDefault(require("../../src/env"));
// import { describe, it } from 'node:test';
const globals_1 = require("@jest/globals");
// const sign = jwt.sign as jest.MockedFunction<()=> string>;
// sign.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJheW1vbmR1bXVva29yb0BnbWFpbC5jb20iLCJpYXQiOjE2NTk5MDYwNjB9.M7ykMeph__eQqHqlcwvy1udbRe4nZCULctsSet4MqQ8');
// import AdminModel from '../model/admin/adminDB';
// import { debug } from 'console';
// import { SocketAddress } from 'net';
// Database Connections
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, admin_1.dbConnect)(); }));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, admin_1.dbDisconnect)(); }));
(0, globals_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, admin_1.dropCollections)(); }));
(0, globals_1.describe)('Tests for the Scores Endpoints', () => {
    // let id = "62f02370d5002bb9cd658da3";
    // const sign = jest.spyOn(jwt, 'sign'); 
    // sign.mockImplementation(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJheW1vbmR1bXVva29yb0BnbWFpbC5jb20iLCJpYXQiOjE2NTk5MDYwNjB9.M7ykMeph__eQqHqlcwvy1udbRe4nZCULctsSet4MqQ8');
    // beforeAll(async () => {
    //     const scores = await Scores.findOne();
    //     id = scores?.user_id;
    // })
    // afterAll( async () => {
    //     const score = await Scores.findOneAndDelete({id});
    // })
    const token = jsonwebtoken_1.default.sign({ role: 'admin' }, `${env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.JWT_SECRET}`);
    (0, globals_1.it)('Should return 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/scores/getscores`).set('Authorization', 'Bearer ' + token + '1');
        (0, globals_1.expect)(res.status).toBe(401);
    }));
    (0, globals_1.it)('Should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        // const jwtSpy = jest.spyOn(jwt, 'verify');
        // jwtSpy.mockReturnValue(token);
        const res = yield (0, supertest_1.default)(app_1.default).get(`/scores/getscores`).set('Authorization', 'Bearer ' + token);
        (0, globals_1.expect)(res.status).toBe(200);
    }));
});
