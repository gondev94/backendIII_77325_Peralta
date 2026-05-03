import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 7777, () => {
    console.log(`Server is running on PORT ${process.env.PORT || 7777}`)
})