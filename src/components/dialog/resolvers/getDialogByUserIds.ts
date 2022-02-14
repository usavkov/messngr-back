import { Brackets } from 'typeorm';

import { Dialog } from '../../../entity';

export const findDialogByUserIds = async (userIds: string[]) => {
  
  const dialog = await Dialog
    .createQueryBuilder('dialog')
    .leftJoinAndSelect('dialog.interlocutors', 'interlocutors')
    .where('"dialog"."userIds"[1] = :userId1 AND "dialog"."userIds"[2] = :userId2', {
      userId1: userIds[0],
      userId2: userIds[1],
    })
    .orWhere('"dialog"."userIds"[1] = :userId2 AND "dialog"."userIds"[2] = :userId1', {
      userId1: userIds[0],
      userId2: userIds[1],
    })
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
