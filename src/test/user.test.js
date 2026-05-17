import { expect } from "chai";
import dotenv from "dotenv";
import { userService } from "../services/user.service.js";

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

describe("User Service - Unit", () => {
    let userServiceInstance;

    beforeAll(() => {
        userServiceInstance = new userService();

        userServiceInstance.registerUser(
            "gonzalo.peralta.developer@mail.com",
            "123456789",
            "gondev"
        );
    });

    it("should return all users", () => {
        const users = userServiceInstance.getAllUsers();
        expect(users).to.be.an("array");
        expect(users.length).to.be.greaterThan(0);
    });

    it("throw error if email is already in use", () => {
        expect(() => {
            userServiceInstance.registerUser(
                "gonzalo.peralta.developer@mail.com",
                "123456789",
                "otroUsername"
            );
        }).to.throw("Email already in use");
    });

    it("throw error if username is already in use", () => {
        expect(() => {
            userServiceInstance.registerUser(
                "gonzalo.peralta.developer@nuevomail.com",
                "123456789",
                "gondev"
            );
        }).to.throw("Username already in use");
    });

    it("throw token when user login succesfully", () => {
        const result = userServiceInstance.loginUser(
            "gonzalo.peralta.developer@mail.com",
            "123456789"
        );
        expect(result).to.be.an("object");
        expect(result).to.have.property("token");
        expect(result).to.have.property("user");
        expect(result.user).to.have.property("email", "gonzalo.peralta.developer@mail.com");
        expect(result.user).to.have.property("username", "gondev");
    });

    it("throw error when the password or email is incorrect", () => {
        expect(() => {
            userServiceInstance.loginUser(
                "gonzalo.peralta.developer@mail.com",
                "1234567890"
            );
        }).to.throw("Invalid Credentials");
    });

    it("throw error when the email is incorrect", () => {
        expect(() => {
            userServiceInstance.loginUser(
                "gonzalo.peralta.developer@nuevomail.com",
                "123456789"
            );
        }).to.throw("Invalid Credentials");
    });
});
