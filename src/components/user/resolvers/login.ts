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
      .addSelect('user.password')
      .where(
        'user.username = :login OR user.email = :login',
        { login },
      )
      .getOne();

    if (!user) throw new Error('User not found')

    const isWrongCredentials = await isPasswordCorrect(password, user.password);    

    if (isWrongCredentials) {
      throw new AuthenticationError('Validation error', { errors: [isWrongCredentials] });
    };

    const token = jwt.sign(
      {
        login,
        username: user.username,
        role: user.role,
        userId: user.id,
      }, 
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );


    return token;
  } catch (errors) {
    throw errors;
  }
};
