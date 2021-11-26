import "reflect-metadata";
import * as fs from 'fs';
import * as path from 'path';
import * as express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { flow } from 'lodash';

import {
  apiRouter,
  authenticate,
  resolvers,
} from "./src";

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'src/schema.graphql'),
  'utf8',
);

const applyContext = (ctx) => flow(
  authenticate,
)(ctx);

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers, context: applyContext });

  await server.start();
  await createConnection();

  const app = express();

  app.use(express.json())
  app.use(apiRouter);

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
