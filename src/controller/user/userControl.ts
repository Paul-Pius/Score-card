import { Request, Response } from "express";
import { UserModel } from "../../model/user/userDB";
import { userServices } from "../../services/user-services/user-services";
import { password } from "../../utilities/password";
import { token } from "../../utilities/token";

const user = {
  //create new user
  async createUser(req: Request, res: Response) {
    const data = req.body;
    try {
      data.password = await password.hash(data.password);
      data.token = token.createToken({ email: data.email });
      await userServices.createUser(data);
      return res.json({ message: "User Created Successfully" });
    } catch (error) {
      return res.status(404).json({ message: "Error: User Not Created" });
    }
  },

  //edit a user
  async editUser(req: Request, res: Response) {
    const user = req.body;
    if (!user.email) {
      return res.status(404).json({
        message: "Error: User Not Edited, Please Check The Email and Try Again",
      });
    } else {
      try {
        await userServices.editUser(user);
        return res.json({ message: "User Edited Successfully" });
      } catch (error) {
        return res.status(404).json({ message: "Error: User Not Edited" });
      }
    }
  },

  //delete a user
  async deleteUser(req: Request, res: Response) {
    const email = req.body.email;
    if (!email) {
      return res.status(404).json({
        message:
          "Error: User Not Deleted, Please Insert An Email and Try Again",
      });
     
    } else {
      try {
        await userServices.deleteUser(email);
       return res.json({ message: "User Deleted Successfully" });
      } catch (error) {
        return res.status(404).json({ message: "Error: User Does Not Exist" });
      }
    }
  },

  //De-activate a user
  async setUserStatus(req: Request, res: Response) {
    const status = req.route.path === "/activate" ? true : false;
    const email = req.body.email;
    const result = await userServices.setUserStatus(email, status);
    if (result) {
      return res.json({ message: "User status updated successfully" });
    } else {
      return res.status(404).json({ message: "Error: User Does Not Exist" });
    }
  },

  //User-Login
  async userLogin(req: Request, res: Response) {
        try {
          const { email, password: pass } = req.body
          const result: user = await userServices.login(email, pass)
          // const status: any = await userServices.emailChecker(email)
          // if(!status) return res.status(400).json({message: "wrong email"})
          // const passStatus = await userServices.passwordChecker(pass, status.password)
          // if(!passStatus) return res.status(400).json({message: "wrong password"})
          delete result.password;
          return res.json(result)
        } catch (error){
          console.log(error);
          
        }
     },
     
  async updatePassword(req: Request, res: Response) {
    const {newPassword, passwordConfirm} = req.body;
    if(!newPassword || !passwordConfirm || newPassword !== passwordConfirm){
      return res.status(401).json({
        message:
          "Password not changed, Please check your input fields and make sure its same",
      });
    }
    try {
      const {email}: any = token.confirmToken(req.headers.authorization);
      await userServices.updateUserPassword(email, newPassword);
      return res.status(201).json({message: 'Password updated successfully'});
      } catch (error) {
        return res.status(404).json({ message: "Error: Please try using a different password from your previous pasword Password not updated"});
      } 
  }
};


export { user };
