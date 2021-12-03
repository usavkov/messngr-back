import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';

import { User } from '../../../entity';
// import { UserValidation } from './validation';

const encryptPassword = async (user) => {
  const password = await bcrypt.hash(user.password, 9);

  return { ...omit(user, 'confirmPassword'), password };
};

export const signup = async (_parent, args, context, info) => {
  console.log(args);
  try {
    // return new UserValidation(args)
    //   .isConfirmPasswordMatches()
    //   .completeValidation()
    //   .then(encryptPassword)
    //   .then((user) => User.create(user));
  } catch (errors) {
    throw errors;
  }
};
