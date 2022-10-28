import { resolveSoa } from "dns";
import { Request, Response, NextFunction } from "express";
import { superAdminServices } from "../../services/admin-services/admin-services";

import { password } from "../../utilities/password";
import { token } from "../../utilities/token";


const superAdminControls = {
  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const superAdmin = await superAdminServices.getAllSuperAdmins();
    if (Boolean(superAdmin.length)) {
      res.status(400).json({ Error: "Only one Super Admin is required" });
      return;
    }
    data.password = await password.hash(data.password);
    data.token = token.createToken({ role: "superAdmin" });
    return res.status(201).json(await superAdminServices.createSuperAdmin(data));
  },
};

export { superAdminControls };
