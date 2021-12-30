import { UserInputError } from 'apollo-server-express';
import { validate } from 'class-validator';
import { findDialogByUserIds } from '.';

import { Dialog, User } from '../../../entity';

export const createDialog = async (userIds) => {
  // TODO: add validation

  const dialogDB = await findDialogByUserIds(userIds);

  if (dialogDB) throw new Error('Dialog is already exist')

  const interlocutors = await User.findByIds(userIds);

  const dialog = Dialog.create({
    userIds,
    interlocutors,
  });

  const errors = await validate(dialog);

  if(errors.length) throw new UserInputError('Validation error', { errors });

  await dialog.save();

  return dialog;
};

export const createDialogResolver = async (_parent, { interlocutorId }, { user }, info) => {
  try {
    const dialog = await createDialog([interlocutorId, user.userId]);

    return dialog;
  } catch (errors) {
    throw errors;
  }
};
