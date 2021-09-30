import jwt from "jsonwebtoken";
// import { config } from "dotenv";
import userI from "../userInterface";

export default function jwtGenerator(user_id: userI[]) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}

