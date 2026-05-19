import { User } from "../models/user.model.js";
import { randomUUID } from "crypto";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage('./data');
const USERS_KEY = 'users';

const getUsers = () => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
};

const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export class UserRepository {
    findAllUsers() {
        return getUsers();
    }
    
    findUserById(id) {
        const users = getUsers();
        return users.find(user => user.id === id);
    }

    findUserByEmail(email) {
        const users = getUsers();
        return users.find(user => user.email === email);
    }

    findUserByUsername(username) {
        const users = getUsers();
        return users.find(user => user.username === username);
    }

    createUser({ email, password, username }) {
        const users = getUsers();
        const newUser = new User({
            id: randomUUID(),
            email,
            password,
            username
        });
        users.push(newUser);
        saveUsers(users);
        return newUser;
    }

    updateUser(id, email, password, username) {
        const users = getUsers();
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error("User not found");
        }
        users[userIndex].email = email;
        users[userIndex].password = password;
        users[userIndex].username = username;
        saveUsers(users);
        return users[userIndex];
    }

    deleteUser(id) {
        const users = getUsers();
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        const filteredUsers = users.filter(user => user.id !== id);
        saveUsers(filteredUsers);
        return user;
    }
}

