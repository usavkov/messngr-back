import { createChatResolver as createChat } from "../components/chat";
import { createDialogResolver as createDialog } from "../components/dialog";
import { sendMessageResolver } from "../components/message";
import {
  addContactResolver as addContact,
  removeContactResolver as removeContact,
  signupResolver as signup,
} from "../components/user";

export default function(pubsub) {
  return {
    addContact,
    createChat,
    createDialog,
    removeContact,
    sendMessage: sendMessageResolver(pubsub),
    signup,
  }
};
