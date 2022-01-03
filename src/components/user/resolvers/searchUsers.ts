import { Brackets } from 'typeorm';

import { User } from '../../../entity';

export const searchUsersResolver = async (_parent, { search }, { user }) => {
  try {
    // TODO: add validation; support filters
    
    const searchValue = `%${search}%`;

    const users = await User
      .createQueryBuilder('user')
      .where('user.id <> :userId', { userId: user.userId})
      .andWhere(new Brackets(qb => {
        qb.where("user.username like :searchValue", { searchValue })
          .orWhere("user.firstName like :searchValue", { searchValue })
          .orWhere("user.lastName like :searchValue", { searchValue })
      }))
      .getMany();

    return users;
  } catch (error) {
    throw error;
  }
};
