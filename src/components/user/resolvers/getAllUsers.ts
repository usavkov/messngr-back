import { User } from '../../../entity';

export const getAllUsersResolver = async (_parent, _args, { user }) => {
  try {
    // TODO: check permission to load all users

    const users = await User.find()

    return users;
  } catch (error) {
    throw error;
  }
};
