import { createChatResolver as createChat } from "../components/chat";
import { createDialogResolver as createDialog } from "../components/dialog";
import { sendMessageResolver } from "../components/message";
import { signupResolver as signup } from "../components/user";

export default function(pubsub) {
  return {
    createChat,
    createDialog,
    sendMessage: sendMessageResolver(pubsub),
    signup,
  }
};
