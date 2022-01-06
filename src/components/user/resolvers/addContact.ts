import { User } from '../../../entity';

export const addContactResolver = async (_parent, { userId }, { user }) => {
  try {
    // TODO: add validation

    await User.createQueryBuilder()
      .relation('contacts')
      .of(user?.userId)
      .add(userId);

    return {
      id: userId,
    };
  } catch (error) {
    throw error;
  }
};
