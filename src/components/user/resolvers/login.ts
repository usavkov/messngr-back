import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

import { isPasswordCorrect } from '../validation';
import { User } from '../../../entity';
// import { UserValidation } from './validation';

dotenv.config();

export const loginResolver = async (_parent, args) => {
  const { login, password } = args;
 
  try {
    // TODO: add validation for input
   
    const user = await User
      .createQueryBuilder('user')
      .addSelect("user.password")
      .getOne();

    const isWrongCredentials = await isPasswordCorrect(password, user.password);    

    if (isWrongCredentials) {
      throw new AuthenticationError('Validation error', { errors: [isWrongCredentials] });
    };

    const token = jwt.sign(
      {
        login,
        role: user.role,
        userId: user.id,
      }, 
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );


    return { ...user, token };
  } catch (errors) {
    throw errors;
  }
};
