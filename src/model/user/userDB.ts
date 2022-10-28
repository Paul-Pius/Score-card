import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },
    stack: {
      type: String,
      required: true
    },

    squad: {
      type: Number,
      required: true
    },

    isActive: {
      type: Boolean,
      required: true
    },

    profilePicture: {
      type: String,
      default: `url('../img/add-dp-icon.png')`,
    },
    phoneNumber: {
      type: String,
      default: "0",
    },
    password:  {
      type: String,
      required: true
    },

    token:  {
      type: String,
      required: true,
      default: ""
    },

    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);


export { UserModel };
