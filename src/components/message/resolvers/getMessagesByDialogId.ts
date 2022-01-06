import { Message } from '../../../entity';
import { MessageTypes } from '../constants';

export const findMessagesByDialogId = async (dialogId) => {
  const messages = await Message.createQueryBuilder('message')
    .leftJoinAndSelect('message.dialog', 'dialog')
    .where('dialog.id = :dialogId', { dialogId })
    .andWhere('message.type = :type', { type: MessageTypes.DIRECT })
    .orderBy({
      'message.createdAt': 'DESC',
    })
    .getMany();

  return messages;
};

export const getMessagesByDialogIdResolver = async (
  _parent,
  { dialogId },
  { user }
) => {
  try {
    const messages = await findMessagesByDialogId(dialogId);

    return messages || [];
  } catch (error) {
    throw error;
  }
};
