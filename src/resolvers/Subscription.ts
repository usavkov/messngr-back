import {
  messageSentResolver,
} from "../components/message";

export default function (pubsub) {
  return {
    messageSent: messageSentResolver(pubsub),
  }
};
