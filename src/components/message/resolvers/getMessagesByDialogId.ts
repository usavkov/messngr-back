import { DEFAULT_LIMIT } from '../../../constants';
import { Message } from '../../../entity';
import { MessageTypes } from '../constants';

export const findMessagesByDialogId = async (
  dialogId,
  {
    limit = DEFAULT_LIMIT,
    offset = 0,
  } = {},
) => {
  const messages = await Message.createQueryBuilder('message')
    .leftJoinAndSelect('message.dialog', 'dialog')
    .where('dialog.id = :dialogId', { dialogId })
    .andWhere('message.type = :type', { type: MessageTypes.DIRECT })
    .orderBy({
      'message.createdAt': 'DESC',
    })
    .offset(offset)
    .limit(limit)
    .getMany();

  return messages;
};

export const getMessagesByDialogIdResolver = async (
  _parent,
  {
    dialogId,
    limit,
    offset,
  },
  { user }
) => {
  try {
    const messages = await findMessagesByDialogId(dialogId, {
      limit,
      offset,
    });

    return messages || [];
  } catch (error) {
    throw error;
  }
};
