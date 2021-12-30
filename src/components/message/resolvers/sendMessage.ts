import { UserInputError } from 'apollo-server-express';
import { validate } from 'class-validator';

import { MESSAGE_SENT } from '../../../constants';
import { User, Message } from '../../../entity';
import { getChatById } from '../../chat';
import { MessageTypes } from '../constants';
import {
  findDialogById,
  findDialogByUserIds,
} from '../../dialog';
import { rest } from 'lodash';

export const sendMessageResolver = (pubsub) => async (
  _parent,
  {
    type,
    dialogId,
    chatId,
    to,
    content,
    attachments,
    ...rest
  },
  { user }
) => {
  try {
    // TODO: add validations
    if (!(type in MessageTypes)) throw new Error(`Unkown message type - ${type}`);

    const sender = await User.findOne({ id: user.userId });
    const recipient = await User.findOne({ id: to });

    if (!sender || (to && !recipient)) throw new Error('User not found');

    const message = Message.create({
      type,
      from: user.userId,
      to,
      content,
      attachments,
    });

    if (type === MessageTypes.DIRECT) {
      if (chatId) throw new Error('Direct message cannot has "chatId"');

      const dialog = dialogId
        ? await findDialogById(dialogId)
        : await findDialogByUserIds([to, user.userId]);
      
      if (!dialog) throw new Error('Dialog not found');

      message.dialog = dialog;
    }

    if (type === MessageTypes.CHAT) {
      const chat = await getChatById(chatId);

      message.chat = chat;
    }

    const errors = await validate(message);

    if (errors.length) throw new UserInputError('Validation error', { errors });

    await message.save();
    pubsub.publish(MESSAGE_SENT, {
      messageSent: {
        ...message,
        dialogId: message.dialog?.id,
        chatId: message.chat?.id,
      },
    })

    return {
      ...message,
      dialogId: message.dialog?.id,
      chatId: message.chat?.id,
    };
  } catch (error) {
    throw error;
  }
};
