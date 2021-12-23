import { createChatResolver as createChat } from "../components/chat";
import { createDialogResolver as createDialog } from "../components/dialog";
import { sendMessageResolver as sendMessage } from "../components/message";
import { signupResolver as signup } from "../components/user";

export default {
  createChat,
  createDialog,
  sendMessage,
  signup,
};
