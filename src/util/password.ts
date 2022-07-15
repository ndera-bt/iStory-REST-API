import * as bcrypt from "bcrypt";

export class PasswordManager {
  static async hash(password: string, saltRound = 12) {
    return await bcrypt.hash(password, saltRound);
  }

  static async verify(password: string, userPass: string) {
    return await bcrypt.compare(password, userPass);
  }
}
