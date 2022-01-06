import { withFilter } from 'graphql-subscriptions';

import { MESSAGE_SENT } from '../../../../constants';

export const messageSentResolver = (pubsub) => {
  const resolverFn = (_, context) => {
    return pubsub.asyncIterator([MESSAGE_SENT]);
  };

  // TODO: add filter fn
  const filterFn = (payload, variables) => {
    return true;
  };

  return {
    subscribe: withFilter(resolverFn, filterFn),
  };
};
