import {
  getChatByIdResolver as getChatById,
} from '../components/chat';
import {
  getDialogByUserIdsResolver as getDialogByUserIds,
} from '../components/dialog';
import {
  getAllMessagesResolver as getAllMessages,
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
  login,
};
