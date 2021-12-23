import { UserInputError } from 'apollo-server-express';
import { validate } from 'class-validator';

import { User, Message } from '../../../entity';
import { getChatById } from '../../chat';
import {
  createDialog,
  findDialogByUserIds,
} from '../../dialog';
import { MessageTypes } from '../constants';

export const sendMessageResolver = async (
  _parent,
  { type, chatId, to, content, attachments },
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

      const dialogDB = await findDialogByUserIds([to, user.userId]);
      const dialog = dialogDB ? dialogDB : await createDialog([to, user.userId]);

      message.dialog = dialog;
    }

    if (type === MessageTypes.CHAT) {
      const chat = await getChatById(chatId);

      message.chat = chat;
    }
    
    const errors = await validate(message);

    if (errors.length) throw new UserInputError('Validation error', { errors });

    await message.save();

    return message;
  } catch (error) {
    throw error;
  }
};
