import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken';

dotenv.config();

import { User } from '../../../entity';
// import { UserValidation } from './validation';

export const login = async (_parent, args) => {
  const { login, password } = args;

  try {
    // const user = await User.findOne({
    //   where: {
    //     username: login,
    //   },
    // });

    // await new UserValidation(user)
    //   .isUserExist()
    //   .isPasswordCorrect(password);

    // user.token = jwt.sign({ login, userId: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });

    // return user;
  } catch (errors) {
    throw errors;
  }
};
