import { User } from "../models/user.model.js";
import { randomUUID } from "crypto";

const users = [];

export class UserRepository {
    findAllUsers() {
        return users
    }
    
    findUserById(id) {
        return users.find(user => user.id === id);
    }

    findUserByEmail(email) {
        return users.find(user => user.email === email);
    }

    findUserByUsername(username) {
        return users.find(user => user.username === username);
    }

    createUser({ email, password, username }) {
        const newUser = new User({
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

