import { NextFunction, Request, Response } from "express";
import { stackServices } from "../../services/stack-services/stack-services";

//-- create a logic for creating a stack --//
const stackControls = {
  async createStack(req: Request, res: Response) {
    try {
      const newStack = await stackServices.createStack(req.body);
      res.status(201).json(newStack);
    } catch (error) {
      res.status(404).json({
        message: "Error creating stack",
      });
    }
  }, //-- end of createStack --//

  //-- edit a stack --//
  async modifystack(req: Request, res: Response) {
    const body = req.body;

    //-- check for case sensitivity for stackName --//
    const stack = body.stackName.split("");
    for (let i = 0; i < stack.length; i++) {
      if (i === 0) {
        stack[i] = stack[i].toUpperCase();
      } else {
        stack[i] = stack[i].toLowerCase();
      }
    }
    body.stackName = stack.join("");

    //-- end of check for case sensitivity for stackName --//
    const editedStack = await stackServices.editStack(body);
    //-- if stack is not found --//
    if (editedStack) res.status(200).json(editedStack);
    else
      res.status(404).json({
        message: "Error editing stack",
      });
  }, //-- end of editStack --//

  //-- delete a stack --//
  async removestack(req: Request, res: Response) {
    const deletedStack = await stackServices.deleteStack(req.params.stackName);
    //--condition to check if stack is found or not--//
    if (!deletedStack) {
      res.status(404).json({
        message: "Error deleting stack",
      });
    } else {
      res.status(200).json({ message: "Stack Deleted" });
    }
  }, //-- end of deleteStack --//

  //-- view all stacks --//
  async viewStacks(req: Request, res: Response) {
    const viewStack = await stackServices.viewAllStacks();
    if (viewStack) res.status(200).json(viewStack);
    else
      res.status(404).json({
        message: "Error viewing all stacks",
      });
  },
};

export { stackControls };
