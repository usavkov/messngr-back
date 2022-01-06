import { withFilter } from 'graphql-subscriptions';

import { MESSAGE_DELETED } from '../../../../constants';

export const messageDeletedResolver = (pubsub) => {
  const resolverFn = (_, context) => {
    return pubsub.asyncIterator([MESSAGE_DELETED]);
  };

  // TODO: add filter fn
  const filterFn = (payload, variables) => {
    return true;
  };

  return {
    subscribe: withFilter(resolverFn, filterFn),
  };
};
