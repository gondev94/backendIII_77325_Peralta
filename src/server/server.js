import express from "express";
import dotenv from "dotenv";
import userRouter from "../routes/user.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

export default app;
