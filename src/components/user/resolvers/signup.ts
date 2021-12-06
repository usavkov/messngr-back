import { getManager } from 'typeorm';

import { User } from '../../../entity';
import { encryptPassword } from '../utils';
import { UserValidation } from '../validation';

export const signup = async (_parent, args, context, info) => {
  try {
    const manager = getManager();
    const user = manager.create(User, args);

    await user.save();

    return user;
  } catch (errors) {
    throw errors;
  }
};
