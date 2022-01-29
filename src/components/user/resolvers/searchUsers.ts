import { Brackets } from 'typeorm';

import { DEFAULT_LIMIT } from '../../../constants';
import { User } from '../../../entity';

export const searchUsersResolver = async (
  _parent,
  {
    search,
    limit = DEFAULT_LIMIT,
    offset = 0,
  },
  { user },
) => {
  try {
    // TODO: add validation; support filters

    const searchValue = `%${search.toLowerCase()}%`;

    const users = await User.createQueryBuilder('user')
      .where('user.id <> :userId', { userId: user.userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(user.username) like :searchValue', { searchValue })
            .orWhere('LOWER(user.firstName) like :searchValue', { searchValue })
            .orWhere('LOWER(user.lastName) like :searchValue', { searchValue });
        })
      )
      .offset(offset)
      .limit(limit)
      .getMany();

    return users;
  } catch (error) {
    throw error;
  }
};
