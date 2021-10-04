import jwt from "jsonwebtoken";

import userI from "../userInterface";

export default function jwtGenerator(user_id: userI[]) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}
