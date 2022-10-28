import { Request, Response, NextFunction } from "express";
import { Admin } from "mongodb";
import { validateAdminInput } from "../../middlewares/validation/admin-validation/admin-validation";
import { adminServices } from "../../services/admin-services/admin-services";
import { password } from "../../utilities/password";

const adminControls = {
  async createAdmin(req: Request, res: Response) {
    try {
      console.log(req.body)
      const adminBody = await adminServices.createAdmin(req.body);
      return res.json(adminBody);
    } catch (err) {
      return res
        .status(409)
        .json({ message: "could not create Admin, email already exists" });
    }
  },

  async editAdmin(req: Request, res: Response) {
    try {
      const adminBody = await adminServices.editAdmin(req.body);
      return res.json(adminBody);
    } catch (err) {
      return res.status(409).json({ message: "could not edit Admin" });
    }
  },

  async deleteAdmin(req: Request, res: Response) {
    const email = req.body.email;
    const admin = await adminServices.removeAdmin(email);
    if (!admin) {
      return res.status(409).json({ Error: "This Admin does not exist" });
    }
    return res.json({ message: "Admin successfully deleted" });
  },

  async setAdminStatus(req: Request, res: Response) {
    const status = req.route.path === "/activate" ? true : false;
    try {
      const email = req.body.email;
      const admin = await adminServices.setAdminStatus(email, status);
      res.json({ message: "Admin status updated successfully" });
    } catch (err) {
      return res.status(409).json({ Error: "Could not complete this action" });
    }
  },

  async getAllAdmin(req: Request, res: Response) {
    const admin = await adminServices.getAllAdmin();
    if (admin.length === 0) {
      return res.json({ message: "No Admin Yet" });
    }
    return res.json(admin);
  },

  async savePicture(req: Request, res: Response) {
    let image: any = req.file;
    const { originalname, buffer } = image;
    const { email } = req.body;
    const data = {
      email: email,
      fileName: originalname,
      image: buffer,
    };
    try {
      await adminServices.saveAdminPicture(data);
      return res.json({
        message: "Admin Profile Picture successfully uploaded",
      });
    } catch (err) {
      return res
        .status(409)
        .json({ message: "Could not complete this action" });
    }
  },

  async updateAdminPass(req: Request, res: Response) {
    try {
      // console.log(req)
    const { email, password: pass } = req.body;
    //use this later
    const status = await adminServices.findOneAdmin(email);
  
    if (status.length === 0) {
      return res.status(409).json({ message: "Could not find this admin" });
    }
      await adminServices.updateAdminPassword(email, await password.hash(pass));
      res.json({
        message: "Admin Password successfully uploaded",
      });
    } catch (error) {
      return res
        .status(409)
        .json({ message: "Could not update password for this admin" });
    }
  },

  //admin-Login
  async adminLogin(req: Request, res: Response) {
      try {
        const { email, password: pass } = req.body
        const result: AdminReg = await adminServices.login(req.body);
        delete result.password;
        return res.json(result);
      } catch(error) {
        return res.send(error)
      }
     }
};
export { adminControls };
