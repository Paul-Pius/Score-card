import { UserModel } from "../../model/user/userDB";
import { password } from "../../utilities/password";
import { token } from "../../utilities/token";

const userServices = {
  async createUser(data: any) {
    const users = new UserModel(data);
    return await users.save();
  },

  async editUser(data: any) {
    return await UserModel.findOneAndUpdate({ email: data.email }, data);
  },

  async deleteUser(email: String) {
    return await UserModel.findOneAndDelete({ email: email });
  },

  async setUserStatus(email: String, status: Boolean) {
    return await UserModel.findOneAndUpdate(
      { email: email },
      { isActive: status }
    );
  },

  async getUser(firstName: String, lastName: String) {
    return await UserModel.find({ firstname: firstName, lastname: lastName });
  },

  async getuserByEmail(email: String) {
    return await UserModel.find({ email: email });
  },

  capitalizeUserName(fullname: String) {
    let output: String[] = [];
    fullname.split(" ").forEach((name) => {
      let x = name.split("");
      x[0] = x[0].toUpperCase();
      output.push(x.join(""));
    });
    return output;
  },

  
  async emailChecker (email: string) {
    return await UserModel.findOne({email: email})
  },
  async passwordChecker (pass: string, hash: string) {
    return await password.compare(pass, hash)
  },

  async login (email: string, pass: string) {
    const user: user = ((await UserModel.aggregate([
      {
        $match: {
          email: email
        }
      },
      {
        $project: {
          firstname: 1,
          lastname: 1,
          email: 1,
          stack: 1,
          squad: 1,
          profilePicture: 1,
          phoneNumber: 1,
          password: 1,
          token: 1,
          role: 1
        }
      },
    ])
    )[0]);
    if(!user) throw new Error("user does not exist");
    const validPaswword = await password.compare(pass, user.password);
    if(!validPaswword) throw new Error ("Invalid login details");
    const userToken = token.createToken({email, role: user.role});
    await UserModel.findOneAndUpdate({email}, {token: userToken});
    return {...user, token: userToken};
  },
 
  async updateUserPassword(email: String, newPassword: String) {
    let [user] = await this.getuserByEmail(email);
    if (!user || await password.compare(newPassword, user?.password)) {
      throw new Error(
        "Please use a password thats different from your previous password"
      );
    } else {
      let hashedPassword = await password.hash(newPassword);
      return await UserModel.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );
    }
  },
};

export { userServices };
