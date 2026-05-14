import { body, validationResult } from "express-validator";
import { userService as UserService } from "../services/user.service.js";

const userService = new UserService();

export class userController {
    
    static validateCreate = [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("username").notEmpty().withMessage("Username is required"),
    ]

    static getAllUsers (req, res)  {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    }

    static getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static create (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const { email, password, username } = req.body;
            const user = userService.registerUser(email, password, username);
            res.status(201).json(user);

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    
    }

    static deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = userService.deleteUser(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static updateUser(req, res) {
        try {
            const { id } = req.params;
            const { email, password, username } = req.body;
            const user = userService.updateUser(id, email, password, username);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }    
    static login (req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = userService.loginUser(email, password);
            res.status(200).json({ token, user })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    

    
    static profile(req, res) {
        res.status(200).json({ message: `Welcome ${req.user.username}`, user: req.user });
    }

}