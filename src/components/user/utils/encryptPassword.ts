import * as bcrypt from 'bcryptjs';
import { omit } from "lodash";

export const encryptPassword = async (user) => {
  const password = await bcrypt.hash(user.password, 9);

  return { ...omit(user, 'confirmPassword'), password };
};
