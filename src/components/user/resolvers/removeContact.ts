import { User } from "../../../entity";

export const removeContactResolver = async (_parent, { userId }, { user }) => {
  try {
    // TODO: add validation

    await User
      .createQueryBuilder()
      .relation("contacts")
      .of(user?.userId)
      .remove(userId);

    return {
      id: userId
    };
  } catch (error) {
    throw error;
  }
}
