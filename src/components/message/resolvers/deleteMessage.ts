import { MESSAGE_DELETED } from '../../../constants';
import { Message } from '../../../entity';

export const deleteMessageResolver =
  (pubsub) =>
  async (_parent, { messageId }, { user }) => {
    try {
      // TODO: add validation
      const message = await Message.findOne(messageId);

      if (!message) throw new Error('Message not found');

      await Message.createQueryBuilder()
        .delete()
        .where('id = :messageId', { messageId })
        .execute();

      pubsub.publish(MESSAGE_DELETED, {
        messageDeleted: {
          ...message,
          dialogId: message.dialog?.id,
          chatId: message.chat?.id,
        },
      });

      return {
        id: messageId,
      };
    } catch (error) {
      throw error;
    }
  };
