import { withFilter } from 'graphql-subscriptions';

import { CONTACT_DELETED } from '../../../../constants';

export const contactDeletedResolver = (pubsub) => {
  const resolverFn = (_, context) => {
    return pubsub.asyncIterator([CONTACT_DELETED]);
  };

  // TODO: add filter fn
  const filterFn = (payload, variables) => {
    return true;
  };

  return {
    subscribe: withFilter(resolverFn, filterFn),
  };
};
