import { User } from "../../../entity";

export const findUserById = async (userId: string, options?) => await User.findOne(userId, options);

export const getUserByIdResolver = async (
  _parent,
  { userId },
) => {
  try {
    const user = await findUserById(userId);

    if (!user) throw new Error('User is not found')

    return user;
  } catch (errors) {
    throw errors;
  }
};
