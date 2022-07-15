import * as jwt from "jsonwebtoken";
import { tryCatch } from "../util/tryCatch";

export const isAuth = async (req: any, res: any, next: any) => {
  const authHead = req.get("Authorization");

  if (!authHead) {
    req.isAuth = false;
    return next();
  }

  const token = authHead.split(" ")[1];

  const [error, decode] = await tryCatch(
    jwt.verify,
    token,
    "process.env.JWT_SECRET"
  );

  if (!decode) {
    req.isAuth = false;
    return next();
  }

  (req.isAuth = true), (req.userId = decode.userId);
  next();
};
