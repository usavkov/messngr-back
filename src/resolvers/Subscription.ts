import {
  messageDeletedResolver,
  messageSentResolver,
} from "../components/message";

export default function (pubsub) {
  return {
    messageDeleted: messageDeletedResolver(pubsub),
    messageSent: messageSentResolver(pubsub),
  }
};
