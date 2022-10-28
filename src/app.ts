import express from "express";
import cors from "cors";
//database connector
import { connectDB } from "./database/connector";
import { adminAPI } from "./routes/admin/adminAPI";
import { scoresRoutes } from "./routes/scores/scoresAPI";
import { stackRoutes } from "./routes/stacks/stack";
import { superAdminAPI } from "./routes/super_admin/superAdmin_api";
import { userAPI } from "./routes/user/user_api";

const app = express();

// create a database connection


//no need for body-parser....automatically parse
//all incoming json requests throughout the whole app
app.use(cors({
    origin: "*",
    methods: ["GET, POST, PUT, DELETE"]
}))
app.use(express.json());

// routers start

//users route
app.use("/user", userAPI);

//superAdmin route
app.use("/superadmin", superAdminAPI);

//stack route
app.use("/stack", stackRoutes);

//admin route
app.use("/admin", adminAPI);

//score route
app.use('/scores', scoresRoutes);

export default app;
