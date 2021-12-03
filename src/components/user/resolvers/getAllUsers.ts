import { User } from '../../../entity';
import { UserValidation } from '../validation';

export const getAllUsers = async (_parent, _args, { user }) => {
  try {
    // new UserValidation()
    //   .authenticate(user.isAuthorized);

    // const users = await User.findAll();

    // return users;
  } catch (error) {
    throw error;
  }
};
