import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, immutable: true },
    stack: { type: String, required: true },
    squad: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "Admin",
    },
    password: String,
    token: String,
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("admin", adminSchema);


//admin profile picture schema
const picture = new mongoose.Schema({
  email: String,
  fileName: String,
  image: Buffer,
});

const AdminPictureModel = mongoose.model("pictures", picture);


export { AdminModel, AdminPictureModel };
