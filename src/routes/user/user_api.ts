import express from "express";
import { user } from "../../controller/user/userControl";
import { superAdminOrAdminPass } from "../../middlewares/authentication/authentication";
import { validateLogin } from "../../middlewares/validation/loginvalidator";
import { validateUser } from "../../middlewares/validation/user-validation/user-validation";


const userAPI = express.Router();

//give access to only super admin and admin
userAPI.use("/auth", superAdminOrAdminPass);

//create a new user
userAPI.post("/auth/create", user.createUser);
// userAPI.use("/", superAdminOrAdminPass);

//create a new user
userAPI.post("/create", validateUser, user.createUser);

//edit a user
userAPI.put("/auth/edit", user.editUser);

//deactivate a user
userAPI.put("/auth/deactivate", user.setUserStatus);

//activate a user
userAPI.put("/auth/activate", user.setUserStatus);

//delete a user
userAPI.delete("/auth/delete", user.deleteUser);

//User login
userAPI.post("/login", validateLogin, user.userLogin)

//updatePassword
userAPI.put('/updatePassword', user.updatePassword)

export { userAPI };
