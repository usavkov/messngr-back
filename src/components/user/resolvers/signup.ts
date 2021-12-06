import { validate } from 'class-validator';
import { getManager } from 'typeorm';

import { User } from '../../../entity';
import { encryptPassword } from '../utils';
import { UserValidation } from '../validation';

export const signup = async (_parent, args, context, info) => {
  try {
    const manager = getManager();
    const user = manager.create(User, args);

    // await user.save();

    const errors = await validate(user);

    console.log('-----------------------');
    console.log(errors.length);
    console.log(errors);
    console.log('-----------------------');
    

    return user;
  } catch (errors) {
    throw errors;
  }
};
