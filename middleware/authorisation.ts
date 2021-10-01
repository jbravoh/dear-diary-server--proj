import jsonwebtoken from "jsonwebtoken";

import { Request } from "express";

export interface RequestWithUser extends Request {
  user: string;
}

const jwt = jsonwebtoken;

export default async function authorisation(
  req: RequestWithUser,
  res: any,
  next: any
) {
  const jwtToken = req.header("token");

  try {
    if (!jwtToken) {
      return res.status(403).json("Not Authorised");
    }
    const payload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET
    ) as jsonwebtoken.JwtPayload;

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json("Not Authorised");
  }
}
