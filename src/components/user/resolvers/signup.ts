import * as R from 'ramda';
import { UserInputError } from 'apollo-server-express';
import { validate } from 'class-validator';
import { getManager } from 'typeorm';

import { User } from '../../../entity';
import { encryptPassword } from '../utils';
import { validationFlow, isConfirmPasswordMatches } from '../validation';

export const signupResolver = async (_parent, args, context, info) => {
  try {
    const manager = getManager();

    // TODO: add validation for input

    const inputErrors = validationFlow(isConfirmPasswordMatches)(args);

    if (inputErrors.length)
      throw new UserInputError('Validation error', { errors: inputErrors });

    const password = await encryptPassword(args.password);
    const user = manager.create(User, { ...args, password });
    const errors = await validate(user);

    if (errors.length) throw new UserInputError('Validation error', { errors });

    await user.save();

    return user;
  } catch (errors) {
    throw errors;
  }
};
