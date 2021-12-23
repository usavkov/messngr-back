import * as bcrypt from 'bcryptjs';
import { omit } from "lodash";

export const encryptPassword = async (password) => {
  const encrypted = await bcrypt.hash(password, 9);

  return encrypted;
};
