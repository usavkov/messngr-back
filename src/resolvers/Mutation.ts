import { createChatResolver as createChat } from '../components/chat';
import { createDialogResolver as createDialog } from '../components/dialog';
import {
  sendMessageResolver,
  deleteMessageResolver,
} from '../components/message';
import {
  addContactResolver,
  deleteContactResolver,
  signupResolver as signup,
} from '../components/user';

export default function (pubsub) {
  return {
    addContact: addContactResolver(pubsub),
    createChat,
    createDialog,
    deleteMessage: deleteMessageResolver(pubsub),
    deleteContact: deleteContactResolver(pubsub),
    sendMessage: sendMessageResolver(pubsub),
    signup,
  };
}
