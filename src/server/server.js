import express from "express";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "../routes/user.router.js";
import logger from "../logs/logger.js";
import logsRouter from "../routes/logs.router.js";
import { descriptions } from "jest-config";

dotenv.config();

const app = express();

//swagger documentation
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api De Usuarios",
            version: "1.0.0",
            description:
                "Ejemplode JWT, Rutas publicas/protegidas, Autenticación, Autorización, Crud de usuarios, Logs",
        },
        servers: [{ url: "http://localhost:7777" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID del usuario",
                            example: "1",
                        },
                        email: {
                            type: "string",
                            description: "Email del usuario",
                            example: "Gonzalo@mail.com",
                        },
                        username: {
                            type: "string",
                            description: "Nombre del usuario",
                            example: "Gonzalo",
                        },
                    },
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        token: {
                            type: "string",
                            description: "Token de autenticación",
                            example: "asdasdhojoi21nckxzpckasd12421054956.....",
                        },
                        user: { $ref: "#/components/schemas/User" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Mensaje de error",
                            example: "Error de ejemplo",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            docExpansion: "none",
            persistAuthorization: false,
        },
    }),
);

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
    app.listen(PORT, () => {
        logger.info(`Server is running on PORT ${PORT}`);
    });
}
