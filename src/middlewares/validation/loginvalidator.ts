import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

//User-Login validation 
async function validateLogin (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(2).required()
    })
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error: any) {
        res.status(400).json({message: `${error.details[0].message}`})
    }
}

//SuperAdmin-Signup validation
 async function validateSignUp (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        firstName: Joi.string().required().label("firstName"),
        lastName: Joi.string().required().label("lastName"),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error: any) {
        res.status(400).json(200)
    }
 } 

export { validateLogin, validateSignUp }