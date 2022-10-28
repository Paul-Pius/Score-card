import express from "express";
import { stackControls } from "../../controller/stacks_controller/stacks";
import { superAdminAuthentication } from "../../middlewares/authentication/authentication";

//-- create CRUD operations routes for stack--//
const stackRoutes = express.Router();

//stack authentication
stackRoutes.use("/", superAdminAuthentication);

//-- create or post all stacks --//
stackRoutes.post("/create", stackControls.createStack);

//-- edit a stack --//
stackRoutes.put("/edit", stackControls.modifystack);

//-- delete a stack --//
stackRoutes.delete("/delete/:stackName", stackControls.removestack);

//-- view all stacks --//
stackRoutes.get("/get-stacks", stackControls.viewStacks);

export { stackRoutes };
