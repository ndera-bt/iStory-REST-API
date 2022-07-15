import { validationResult } from "express-validator";
import { tryCatch } from "../util/tryCatch";
import { Signup } from "../action/signup";
import { Response } from "../util/response";
import { TokenManager } from "../util/token";

export class AuthManager {
  static postSignup = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Response.error(errors.array()[0].msg, 500, res);
    }

    const [error, user] = await tryCatch(
      Signup.createUser,
      name,
      email,
      password
    );
    if (error) {
      return Response.error(error.message, 500, res);
    }
    return Response.success("Signup Successful", 200, user, res);
  };

  static login = async (req: any, res: any) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Response.error(errors.array()[0].msg, 500, res);
    }

    const [error, user] = await tryCatch(Signup.login, email, password);

    if (error) {
      return Response.error("Invalid Credentials", 400, res);
    }

    const token = TokenManager.sign(user.id);

    return Response.success("Login Successful", 200, token, res);
  };
}
