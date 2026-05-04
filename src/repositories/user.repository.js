import { userRepository } from "../models/user.model.js";


export class userRepository{
    getAllUsers = async () => {
        try {
            const users = await userRepository.find();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }
}