import { CONTACT_DELETED } from '../../../constants';
import { User } from '../../../entity';

export const deleteContactResolver = (pubsub) => async (_parent, { userId }, { user }) => {
  try {
    // TODO: add validation
    const contact = await User.findOne(userId);

    await User.createQueryBuilder()
      .relation('contacts')
      .of(user?.userId)
      .remove(userId);

    pubsub.publish(CONTACT_DELETED, {
      contactDeleted: contact
    });

    return contact;
  } catch (error) {
    throw error;
  }
};
