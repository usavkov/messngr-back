import { createChatResolver as createChat } from '../components/chat';
import { createDialogResolver as createDialog } from '../components/dialog';
import {
  sendMessageResolver,
  deleteMessageResolver,
} from '../components/message';
import {
  addContactResolver as addContact,
  removeContactResolver as removeContact,
  signupResolver as signup,
} from '../components/user';

export default function (pubsub) {
  return {
    addContact,
    createChat,
    createDialog,
    deleteMessage: deleteMessageResolver(pubsub),
    removeContact,
    sendMessage: sendMessageResolver(pubsub),
    signup,
  };
}
