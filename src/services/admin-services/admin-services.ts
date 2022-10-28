import { AdminModel, AdminPictureModel } from "../../model/admin/adminDB";
import { SuperAdminModel } from "../../model/super_admin/superAdminDB";
import { sendMail } from "../../utilities/emailing";
import { password } from "../../utilities/password";
import { token } from "../../utilities/token";

const superAdminServices = {
  async createSuperAdmin(data: any) {
    const superAdmin = new SuperAdminModel(data);
    return superAdmin.save();
  },
  async getAllSuperAdmins() {
    return SuperAdminModel.find();
  },
};

const adminServices = {
  async createAdmin(adminData: AdminReg) {
    //generate random pass;
    const randomPass = await password.random();
    const data = Object.assign(adminData);
    data.password = randomPass;

    // emailing insertion
    const name = adminData.firstname;
    sendMail(name, data.email, randomPass);

    data.token = token.createToken({ role: "admin" });
    data.password = await password.hash(data.password);

    const admin = new AdminModel(data);
    return await admin.save();
  },

  async getAllAdmin() {
    return AdminModel.find();
  },

  async editAdmin(adminData: AdminReg) {
    //destructure adminBody;
    const { email } = adminData;
    const data = await AdminModel.findOneAndUpdate({ email: email }, adminData);
    return data;
  },
  async removeAdmin(email: string) {
    //find admin by id;
    const admin = await AdminModel.findOneAndRemove({ email: email });
    return admin;
  },

  async setAdminStatus(email: string, status: Boolean) {
    return AdminModel.findOneAndUpdate({ email: email }, { isActive: status });
  },

  async saveAdminPicture(data: any) {
    const pic = new AdminPictureModel(data);
    return await pic.save();
  },

  async login (data: {email: string, password: string}) {
    const admin: AdminReg = (await AdminModel.aggregate([
      {
        $match: {
          email: data.email
        }
      },
      {
        $project: {
          firstname: 1,
          lastname: 1,
          email: 1,
          stack: 1,
          squad: 1,
          password: 1
        }
      },
    ])
    )[0];
    if(!admin) throw Error("admin does not exist");
    const validPassword = await password.compare(data.password, admin.password);
    if(!validPassword) throw Error("Invalid password");
    const adminToken = token.createToken({email: data.email, role: admin.role});
    await AdminModel.findOneAndUpdate({email: data.email}, {token: adminToken});
    const result = {...admin, token: adminToken};
    return result;
  },

  async updateAdminPassword(email: string, password: string) {
    return await AdminModel.findOneAndUpdate(
      { email: email },
      { password: password }
    );
  },
  async findOneAdmin(email: string) {
    return await AdminModel.find({ email: email });
  },


  
  async emailChecker (email: string) {
    return await AdminModel.findOne({email: email})
  },
  async passwordChecker (pass: string, hash: string) {
    return await password.compare(pass, hash)
  }
};

export { superAdminServices, adminServices };
