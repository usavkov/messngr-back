import { DEFAULT_LIMIT } from '../../../constants';
import { Dialog } from '../../../entity';

export const findUserDialogs = async (
  userId,
  {
    limit = DEFAULT_LIMIT,
    offset = 0,
  } = {}
) =>
  await Dialog.createQueryBuilder('dialog')
    .leftJoinAndSelect('dialog.messages', 'message')
    .leftJoinAndSelect('dialog.interlocutors', 'interlocutors')
    .where(':userId = ANY (dialog.userIds)', { userId })
    .orderBy({
      'message.updatedAt': 'DESC',
    })
    .offset(offset)
    .limit(limit)
    .getMany();

export const getUserDialogsResolver = async (_parent, args, { user }) => {
  try {
    // TODO: add validation
    const dialogs = await findUserDialogs(user?.userId, args);

    return dialogs || [];
  } catch (errors) {
    throw errors;
  }
};
