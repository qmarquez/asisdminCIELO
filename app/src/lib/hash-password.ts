import { genSaltSync, hashSync } from "bcryptjs";

export const hashPassword = (password: string, rounds = 10) => {
  const salt = genSaltSync(rounds);
  return hashSync(password, salt);
}