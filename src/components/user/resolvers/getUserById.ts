import { User } from "../../../entity";

export const getUserById = async (userId: string) => await User.findOne(userId);

export const getUserByIdResolver = async (
  _parent,
  { userId },
) => {
  try {
    const user = await getUserById(userId);

    if (!user) throw new Error('User is not found')

    return user;
  } catch (errors) {
    throw errors;
  }
};
