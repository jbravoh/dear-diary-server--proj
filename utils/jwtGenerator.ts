import jwt from "jsonwebtoken"; 
// import { config } from "dotenv";
import userInterface from "../userInterface";

export default function jwtGenerator(user_id:userInterface) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1hr"})
}