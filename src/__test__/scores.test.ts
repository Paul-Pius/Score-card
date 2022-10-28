import jwt from 'jsonwebtoken';
// jest.mock('jsonwebtoken');
import mongoose,{Error} from 'mongoose';

import request from 'supertest';
import app from '../app';
import { dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import { ScoresModel } from '../model/scores/scoresDB';
import envVariables from "../../src/env"


// import { describe, it } from 'node:test';

import { beforeAll, afterEach, beforeEach, afterAll, test, describe, it, expect } from '@jest/globals'


// const sign = jwt.sign as jest.MockedFunction<()=> string>;
// sign.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJheW1vbmR1bXVva29yb0BnbWFpbC5jb20iLCJpYXQiOjE2NTk5MDYwNjB9.M7ykMeph__eQqHqlcwvy1udbRe4nZCULctsSet4MqQ8');


// import AdminModel from '../model/admin/adminDB';
// import { debug } from 'console';
// import { SocketAddress } from 'net';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach(async () => await dropCollections())

describe('Tests for the Scores Endpoints', () => {
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
    const token = jwt.sign({ role: 'admin' }, `${envVariables?.JWT_SECRET}`);

    it('Should return 401', async () => {
        const res = await  request(app).get(`/scores/getscores`).set('Authorization', 'Bearer ' + token + '1');
        expect(res.status).toBe(401);
    })
    it('Should return 200', async () => {
        // const jwtSpy = jest.spyOn(jwt, 'verify');
        // jwtSpy.mockReturnValue(token);
        const res = await request(app).get(`/scores/getscores`).set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200); 
    }) 
    
})   