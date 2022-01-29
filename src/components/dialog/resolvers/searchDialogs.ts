import { Any, Brackets, Raw } from 'typeorm';

import { Dialog } from '../../../entity';

const SAVED_MESSAGES = 'saved';

export const searchDialogsResolver = async (_parent, { search }, { user }) => {
  try {
    // TODO: add validation; support filters

    const searchValue = `%${search.toLowerCase()}%`;

    const dialogs = await Dialog.createQueryBuilder('dialog')
      .leftJoinAndSelect('dialog.messages', 'message')
      .leftJoinAndSelect('dialog.interlocutors', 'interlocutorsSelect')
      .leftJoin('dialog.interlocutors', 'interlocutors')
      .where(':userId = ANY (dialog.userIds)', { userId: user.userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('"dialog"."userIds"[1] <> "dialog"."userIds"[2]')
            .andWhere('interlocutors.username <> :username', { username: user.username })
            .andWhere(
              new Brackets((qb) => {
                qb.where('LOWER(interlocutors.username) like :searchValue', { searchValue })
                  .orWhere('LOWER(interlocutors.firstName) like :searchValue', { searchValue })
                  .orWhere('LOWER(interlocutors.lastName) like :searchValue', { searchValue });
              }))
        })
      )
      .orWhere(new Brackets((qb) => {
        qb.where('"dialog"."userIds"[1] = "dialog"."userIds"[2]')
          .andWhere(
            new Brackets((qb) => {
              qb.where('LOWER(interlocutors.username) like :searchValue', { searchValue })
                .orWhere('LOWER(interlocutors.firstName) like :searchValue', { searchValue })
                .orWhere('LOWER(interlocutors.firstName) like :searchValue', { searchValue })
                .orWhere(`'${SAVED_MESSAGES}' like :searchValue`, { searchValue });
            }))
      }))
      .orderBy({
        'message.updatedAt': 'DESC',
      })
      .getMany();

    return dialogs;
  } catch (error) {
    throw error;
  }
};
