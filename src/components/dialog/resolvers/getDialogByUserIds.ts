import { Dialog } from '../../../entity';

export const findDialogByUserIds = async (userIds: string[]) => {
  const dialog = await Dialog.createQueryBuilder('dialog')
    .leftJoinAndSelect('dialog.interlocutors', 'interlocutors')
    .where(':userId = ANY (dialog.userIds)', { userId: userIds[0] })
    .andWhere(':userId = ANY (dialog.userIds)', { userId: userIds[1] })
    .getOne();

  return dialog;
};

export const getDialogByUserIdsResolver = async (_parent, { userIds }) => {
  try {
    const dialog = await findDialogByUserIds(userIds);

    if (!dialog) throw new Error('Dialog not found');

    return dialog;
  } catch (errors) {
    throw errors;
  }
};
