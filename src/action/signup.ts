import { User } from "../model/user";
import { PasswordManager } from "../util/password";

export class Signup {
  static async createUser(name: string, email: string, password: string) {
    const user = User.create({
      name,
      email,
      password,
    });
    const created = await user.save();
    return created;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email: email } });
    if (!user || !(await PasswordManager.verify(password, user.password))) {
      return false;
    }
    return user;
  }
}
