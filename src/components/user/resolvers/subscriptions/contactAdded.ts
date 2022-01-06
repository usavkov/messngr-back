import { withFilter } from 'graphql-subscriptions';

import { CONTACT_ADDED } from '../../../../constants';

export const contactAddedResolver = (pubsub) => {
  const resolverFn = (_, context) => {
    return pubsub.asyncIterator([CONTACT_ADDED]);
  };

  // TODO: add filter fn
  const filterFn = (payload, variables) => {
    return true;
  };

  return {
    subscribe: withFilter(resolverFn, filterFn),
  };
};
