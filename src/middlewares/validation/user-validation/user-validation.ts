import Joi from "Joi";
import { NextFunction, Request, Response } from "express";
import { join } from "path";

async function validateUser(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "dev"] },
    }),
    stack: Joi.string(),
    squad: Joi.number(),
    phoneNumber: Joi.string(),
    password: Joi.string(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (err: any) {
    res.status(404).json({ Error: `${err.details[0].message}` });
  }
}

export { validateUser };
