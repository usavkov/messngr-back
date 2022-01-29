import { UserInputError } from 'apollo-server-express';
import { validate } from 'class-validator';

import { Chat, User } from '../../../entity';

export const createChatResolver = async (
  _parent,
  { userIds, imageUrl },
  { user },
  info
) => {
  try {
    // TODO: add validation

    const participants = await User.findByIds([...userIds, user.userId]);

    const chat = Chat.create({
      participants,
      moderators: [user?.userId],
      imageUrl,
    });

    const errors = await validate(chat);

    if (errors.length) throw new UserInputError('Validation error', { errors });

    await chat.save();

    return chat;
  } catch (errors) {
    throw errors;
  }
};
