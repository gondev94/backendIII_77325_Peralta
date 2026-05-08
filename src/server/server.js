import express from "express";
import dotenv from "dotenv";
import userRouter from "../routes/user.router.js";
import logger from "../logs/logger.js";

dotenv.config();

const app = express();


app.use(express.json());

// middleware general de la aplicación

app.use((req, res, next) => {
    logger.http(`Request received: ${req.method} | URL: ${req.url}`);
    next();
});


app.use("/api", userRouter);

// endpoints de prueba para los logs
app.get("/debug", (req, res) => {
    logger.debug(`${req.method} | ${req.url}`);
});

app.get("/warn", (req, res) => {
    logger.warn(`${req.method} | ${req.url}`);
});

app.get("/error", (req, res) => {
    logger.error(`${req.method} | ${req.url}`);
});

app.get("/fatal", (req, res) => {
    logger.fatal(`${req.method} | ${req.url}`);
});

app.get("/test", (req, res) => {
    logger.http(`${req.method} | ${req.url}`);
    res.send("Test endpoint");
})
export default app;
