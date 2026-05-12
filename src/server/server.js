import express from "express";
import dotenv from "dotenv";
import userRouter from "../routes/user.router.js";
import logger from "../logs/logger.js";
import logsRouter from "../routes/logs.router.js";


dotenv.config();

const app = express();

app.use(express.json());

// middleware general de la aplicación

app.use((req, res, next) => {
    logger.http(`Request received: ${req.method} | URL: ${req.url}`);
    next();
});

app.use("/api", userRouter);

app.use("/logs", logsRouter);



const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 7777;

if (Number.isNaN(PORT)) {
    logger.error("PORT is not a number");
}

export function startServer() {
    app.listen(PORT, () => {logger.info(`Server is running on PORT ${PORT}`) });
}
