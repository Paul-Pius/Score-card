import mongoose from "mongoose";
import envVariables from "../env"

const connectDB = () => {
  mongoose.connect(
    `${envVariables?.DB_URI}`,
    connectionCallback
  );
};

function connectionCallback(err: any) {
  if (err) console.log(err);
  else console.log("connected to mongoDB Atlas successfully");
}

export { connectDB };
