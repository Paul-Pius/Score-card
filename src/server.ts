import app from "./app";
import { connectDB } from "./database/connector";
import envVariables from "./env"

connectDB();

const port = envVariables?.PORT || 3000;


app.listen(port, () => console.log(`server is running on PORT: ${port}`));

