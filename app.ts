import "reflect-metadata";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as fs from 'fs';
import * as path from 'path';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { flow } from 'lodash';

import {
  authenticate,
  authenticateWS,
  resolvers,
} from "./src";

dotenv.config();

const PORT = process.env.PORT || 4000;

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'src/schema.graphql'),
  'utf8',
);

const applyContext = (ctx) => flow(
  authenticate,
)(ctx);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const startServer = async () => {
  const app = express();

  app.use(cors({
    credentials: true,
  }));
  app.use(express.json());

  const server = new ApolloServer({
    context: applyContext,
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });

  await server.start();
  await createConnection();
  server.applyMiddleware({ app });

  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(connectionParams, webSocket, context) {
      console.log('Connected!')
    },
    async onDisconnect(webSocket, context) {
      console.log('Disconnected!')
    },
    async onOperation(message, params, webSocket) {
      params.context.token = message.payload.token

      return params;
    },
  }, {
    server: httpServer,
    path: server.graphqlPath,
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
