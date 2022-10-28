import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export async function validateAdminInput(req: Request, res: Response, next: NextFunction){
    //define the schema;
    const admin:AdminReg = req.body;
    const schema = Joi.object({
        id: Joi.string(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] }}),
        stack: Joi.string().required(),
        squad: Joi.string().required(),
        role: Joi.string().required()
    })
    const isValid = schema.validate(admin);
    if(isValid.error){
        return res.json(isValid.error.details[0].message);
    }
    next();
}
