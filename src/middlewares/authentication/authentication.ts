import { NextFunction, Request, Response } from "express";
import { token } from "../../utilities/token";

function superAdminAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  try {
    const check: any = token.confirmToken(authorization);
    console.log(authorization)
    if (check.role === "superAdmin") next();
  } catch (error) {
    res.status(401).json({ Error: "Access Denied" });
  }
}

function superAdminOrAdminPass(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  try {
    const check: any = token.confirmToken(authorization);
    
    if (check.role.toLowerCase() === "admin" || check.role === "superAdmin") next();
  } catch (error) {
    res.status(401).json({ Error: "Access Denied" });
  }
}

function userScoresPass(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  try {
    const check = token.confirmToken(authorization);
    res.locals.user = check;
    next();
  } catch (error) {
    res.status(401).json({ Error: "Access Denied" });
  }
}

export { superAdminAuthentication, superAdminOrAdminPass, userScoresPass };
