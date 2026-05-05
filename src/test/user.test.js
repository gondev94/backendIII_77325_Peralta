import { jest } from "@jest/globals";
import request from "supertest";
import { generateFakerUsers } from "../services/user.service.js";

describe("GET /api/users con moks de `faker`", () => {
    //guardamos valor original de USERS_COUNT
    const originalUserCount = process.env.USERS_COUNT;

    //limpiamos el entorno
    beforeEach(() => {
        jest.resetModules();
    });

    //restauramos estado de process.env luego de cada test
    afterEach(() => {
        if (originalUserCount === undefined) {
            delete process.env.USERS_COUNT;
        } else {
            process.env.USERS_COUNT = originalUserCount;
        }
    });

    it("usar mock del servicio faker para generar usuarios", async () => {
        jest.unstable_mockModule("../services/user.service.js", () => ({
            generateFakerUsers: () => [
                {
                    id: 1,
                    name: "Gonzalo Peralta",
                    email: "gonzalo.peralta@mail.com",
                },
            ],
        }));

        //import dinamico: asegura que la app use el modulo mockeado
        const app = (await import("../../app.js")).default;
        const res = await request(app).get("/api/users");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                name: "Gonzalo Peralta",
                email: "gonzalo.peralta@mail.com",
            },
        ]);
    });

    //ejemplo de mockeo para los process.env
    it("mockea process env para cambiar el valor de USERS_COUNT", async () => {
        // mock para verificar con que valor se inicializa
        const userMock = jest.fn(() => []);
        jest.unstable_mockModule("../services/user.service.js", () => ({
            generateFakerUsers: userMock,
        }));
    });
    //simulamos un fallo interno del servidor para validar manejo de errores (500)
    it("responde 500 si el servidor falla", async () => {
        jest.unstable_mockModule("../services/user.service.js", () => ({
            generateFakerUsers: () => {
                throw new Error("Internal Server Error");
            }
        }));
        const app = (await import("../../app.js")).default;
        const res = await request(app).get("/api/users");

        expect(res.statusCode).toBe(500);
        //solo verificamos que exista en campo error, el mensaje puede variar
        expect(res.body).toHaveProperty("error");

    })
});
