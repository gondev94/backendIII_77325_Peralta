import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.router.js";

dotenv.config();

const app = express();

const rawPort = process.env.PORT || 7777;
if (Number.isNaN(rawPort)) {
    console.error("PORT is not a number");
}
const PORT = parseInt(rawPort);

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(PORT|| 7777, () => {
    console.log(`Server is running on PORT ${PORT || 7777}`)
})