import { userRepository } from "../models/user.model.js";
import { randomUUID } from "crypto";

const users = [];

export class userRepository{
    getAllUsers() {
        return users
    }
    
    getUserById(id) {
        return users.find(user => user.id === id);
    }

    getUserByEmail(email) {
        return users.find(user => user.email === email);
    }

    createUser(email, password, username) {
        const newUser = new userRepository({
            id: randomUUID(),
            email,
            password,
            username
        });
        users.push(newUser);
        return newUser;
    }

    updateUser(id, email, password, username) {
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        user.email = email;
        user.password = password;
        user.username = username;
        return user;
    }

    deleteUser(id) {
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        users = users.filter(user => user.id !== id);
        return user;
    }

    
}