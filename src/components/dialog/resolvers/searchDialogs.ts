import { Brackets } from 'typeorm';

import { Dialog } from '../../../entity';

export const searchDialogsResolver = async (_parent, { search }, { user }) => {
  try {
    // TODO: add validation; support filters

    const searchValue = `%${search}%`;

    const dialogs = await Dialog.createQueryBuilder('dialog')
      .leftJoinAndSelect('dialog.messages', 'message')
      .leftJoinAndSelect('dialog.interlocutors', 'interlocutors')
      .where(':userId = ANY (dialog.userIds)', { userId: user.userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('interlocutors.username like :searchValue', { searchValue })
            .orWhere('interlocutors.firstName like :searchValue', { searchValue })
            .orWhere('interlocutors.lastName like :searchValue', { searchValue });
        })
      )
      .getMany();

    return dialogs;
  } catch (error) {
    throw error;
  }
};
