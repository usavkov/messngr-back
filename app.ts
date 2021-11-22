import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import path from 'path';

import resolvers from './src/resolvers';

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'src/schema.graphql'),
  'utf8',
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
