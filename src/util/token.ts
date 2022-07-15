import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export class TokenManager {
  static sign = (userId: string) => {
    const token = jwt.sign({ userId: userId }, "process.env.JWT_SECRET", {
      expiresIn: process.env.EXP,
    });

    return token;
  };
}
