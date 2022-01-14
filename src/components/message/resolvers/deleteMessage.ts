import { cloneDeep } from 'lodash';

import { MESSAGE_DELETED } from '../../../constants';
import { Message } from '../../../entity';

export const deleteMessageResolver =
  (pubsub) =>
  async (_parent, { messageId }, { user }) => {
    try {
      // TODO: add validation
      const message = await Message.findOne(messageId, {
        relations: ['dialog', 'chat'],
      });

      if (!message) throw new Error('Message not found');

      const messageDeleted = cloneDeep(message);

      await Message.createQueryBuilder()
        .delete()
        .where('id = :messageId', { messageId })
        .execute();

      pubsub.publish(MESSAGE_DELETED, { messageDeleted });

      return messageDeleted;
    } catch (error) {
      throw error;
    }
  };
