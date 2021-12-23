import { User, Message } from '../../../entity';

export const getAllMessagesResolver = async (_parent, { interlocutor }, { user }) => {
  try {
    // new UserValidation().authenticate(user.isAuthorized);

    // const interlocutorUser = await User.findOne({
    //   where: {
    //     id: interlocutor,
    //   },
    // });

    // console.log(user);

    // const interlocutorValidation = new UserValidation(interlocutorUser)
    //   .isUserExist();

    // userIds = [interlocutorUser.id, user.userId];

    // const messages = await Message.findAll({
    //   where: {
    //     [Op.or]: [
    //       { from: interlocutorUser.id, to: user.userId },
    //       { from: user.userId, to: interlocutorUser.id },
    //     ]
    //   },
    //   order: [['createdAt', 'DESC']]
    // });

    // return messages;
  } catch (error) {
    throw error;
  }
};
