import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "superAdmin",
    },
    token: String
  },
  { timestamps: true }
);

const SuperAdminModel = mongoose.model("superAdmin", superAdminSchema);


export { SuperAdminModel };
