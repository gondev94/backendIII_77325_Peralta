import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const SALT_ROUND = 10;

export class userService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    getAllUsers() {
        return this.userRepository.findAllUsers();
    }

    registerUser(email, password, username) {
        const existingEmail = this.userRepository.findUserByEmail(email);
        if (existingEmail) {
            throw new Error("Email already in use");
        }
        const existingUsername = this.userRepository.findUserByUsername(username);
        if (existingUsername) {
            throw new Error("Username already in use");
        }
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUND);
        const newUser = this.userRepository.createUser({
            email,
            password: hashedPassword,
            username,
        });
        return newUser;
    }

    deleteUser(id) {
        const user = this.userRepository.deleteUser(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    updateUser(id, email, password, username) {
        const user = this.userRepository.findUserById(id);
        if (!user) {
            throw new Error("User not found");
        }

        if (email && email !== user.email) {
            const existingEmail = this.userRepository.findUserByEmail(email);
            if (existingEmail) {
                throw new Error("Email already in use");
            }
        }

        if (username && username !== user.username) {
            const existingUsername = this.userRepository.findUserByUsername(username);
            if (existingUsername) {
                throw new Error("Username already in use");
            }
        }

        const hashedPassword = password ? bcrypt.hashSync(password, SALT_ROUND) : user.password;
        return this.userRepository.updateUser(id, email || user.email, hashedPassword, username || user.username)

    }

    getUserById(id) {
        const user = this.userRepository.findUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return { id: user.id, email: user.email, username: user.username };
    }

    loginUser(email, password) {
        const user = this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
        );
        return { token, user: { id: user.id, username: user.username, email: user.email },
        };
    }
}
