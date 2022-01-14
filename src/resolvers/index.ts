import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

import Mutation from './Mutation';
import Subscription from './Subscription';
import Query from './Query';

const options = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || null,
  retryStrategy: (times) => Math.min(times * 50, 2000),
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
