import { StackModel } from "../../model/stacks_model/stacks_model";

const stackServices = {
  async createStack(data: any) {
    const stack = new StackModel(data);
    return await stack.save();
  },
  //-- edit a stack --//
  async editStack(data: any) {
    return await StackModel.findOneAndUpdate(
      { stackName: data.stackName },
      data
    );
  },
  //-- delete a stack --//
  async deleteStack(stackName: any) {
    return await StackModel.findOneAndDelete({ stackName: stackName });
  },
  //-- view all stacks --//
  async viewAllStacks() {
    return await StackModel.find();
  },
};

export { stackServices };
