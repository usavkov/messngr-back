import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

import Mutation from './Mutation';
import Subscription from './Subscription';
import Query from './Query';

const options = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  retryStrategy: times => {
      // reconnect after
      return Math.min(times * 50, 2000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export const resolvers = {
  Mutation: Mutation(pubsub),
  Subscription: Subscription(pubsub),
  Query,
};
