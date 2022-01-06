import {
  messageDeletedResolver,
  messageSentResolver,
} from '../components/message';

import {
  contactAddedResolver,
  contactDeletedResolver,
} from '../components/user';

export default function (pubsub) {
  return {
    contactAdded: contactAddedResolver(pubsub),
    contactDeleted: contactDeletedResolver(pubsub),
    messageDeleted: messageDeletedResolver(pubsub),
    messageSent: messageSentResolver(pubsub),
  };
}
