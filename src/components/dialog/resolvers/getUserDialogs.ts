import { Dialog } from '../../../entity';

export const findUserDialogs = async (userId) =>
  await Dialog.createQueryBuilder('dialog')
    .leftJoinAndSelect('dialog.messages', 'message')
    .leftJoinAndSelect('dialog.interlocutors', 'interlocutors')
    .where(':userId = ANY (dialog.userIds)', { userId })
    .orderBy({
      'message.updatedAt': 'DESC',
    })
    .getMany();

export const getUserDialogsResolver = async (_parent, _args, { user }) => {
  try {
    // TODO: add validation
    const dialogs = await findUserDialogs(user?.userId);

    return dialogs || [];
  } catch (errors) {
    throw errors;
  }
};
