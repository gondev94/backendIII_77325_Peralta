import request from "supertest";
import { expect } from "chai";
import app from "../../app.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

describe("User Routes - Integration", () => {
    
    const uniqueId = Date.now();
    const userPayload = {
        email: `tester${uniqueId}@user.com`,
        password: "123456789",
        username: `tester${uniqueId}`,
    };

    it("GET /api/users should return array of users with status 200", async () => {
        const response = await request(app).get("/api/users/");
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an("array")
    });

    it("POST /api/users should register a new user and return status 201", async () => {
        const response = await request(app).post("/api/users/").send(userPayload);
        expect(response.status).to.be.equal(201);
        expect(response.body).to.include.keys("id", "username", "email");
        expect(response.body.username).to.equal(userPayload.username);
        expect(response.body.email).to.equal(userPayload.email);
    });

    it("POST /api/users/login should return token and user info with status 200", async () => {
        const response = await request(app).post("/api/users/login").send({
            email: userPayload.email,
            password: userPayload.password,
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("token");
        expect(response.body).to.have.property("user");
        expect(response.body.user.email).to.equal(userPayload.email);
    });

    it("GET /api/users/profile should return user info with status 401 if token is not provided", async () => {
        const response = await request(app).get("/api/users/profile");
        expect(response.status).to.equal(401);
    })

    it("GET /api/users/profile should return user info with status 200 if token is provided", async () => {
        const login = await request(app).post("/api/users/login").send({
            email: userPayload.email,
            password: userPayload.password,
        })


        const response = await request(app)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("user");
        expect(response.body).to.have.property("email");
        expect(response.body.user.email).to.equal(userPayload.email);
        

    });
})