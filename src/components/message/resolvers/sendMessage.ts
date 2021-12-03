import { User, Message } from '../../../entity';
import { UserValidation } from '../../user';
import { MessageValidation } from '../validation';

export const sendMessage = async (_parent, { to, content }, { user }, info) => {
  try {
    // new UserValidation()
    //   .authenticate(user.isAuthorized)

    // console.log(user);

    // const recipient = await User.findOne({
    //   where: { id: to }
    // });
    
    // const recipientValidation = new UserValidation(recipient)
    //   .isUserExist();

    // const messageValidation = new MessageValidation()
    //   .isEmpty(content)

    // const message = Message.create({
    //   from: user.userId,
    //   to,
    //   content,
    // })

    // return message;
  } catch (error) {
    throw error;
  }
};
