import { CONTACT_ADDED } from '../../../constants';
import { User } from '../../../entity';

export const addContactResolver = (pubsub: any) => async (_parent, { userId }, { user }) => {
  try {
    // TODO: add validation
    const contact = await User.findOne(userId);

    await User.createQueryBuilder()
      .relation('contacts')
      .of(user?.userId)
      .add(userId);


    pubsub.publish(CONTACT_ADDED, {
      contactAdded: contact
    })

    return contact;
  } catch (error) {
    throw error;
  }
};
