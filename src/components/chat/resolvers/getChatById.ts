import { Chat } from "../../../entity";

export const getChatById = async (chatId) => {
  // TODO: add validation

  const chat = await Chat.findOne(chatId);

  if (!chat) throw new Error('Chat is not found');

  return chat;
}

export const getChatByIdResolver = async (_parent, { chatId }) => {
  try {
    // TODO: add validation

    const chat = await getChatById(chatId);

    return chat;
  } catch (errors) {
    throw errors;
  }
}
