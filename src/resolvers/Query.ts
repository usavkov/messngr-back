import {
  getChatByIdResolver as getChatById,
} from '../components/chat';
import {
  getDialogByUserIdsResolver as getDialogByUserIds,
  getUserDialogsResolver as getUserDialogs,
} from '../components/dialog';
import {
  getAllMessagesResolver as getAllMessages,
  getMessagesByDialogIdResolver as getMessagesByDialogId,
} from "../components/message";
import {
  getAllUsersResolver as getAllUsers,
  loginResolver as login,
} from "../components/user";

export default {
  getAllMessages,
  getAllUsers,
  getChatById,
  getDialogByUserIds,
  getMessagesByDialogId,
  getUserDialogs,
  login,
};
