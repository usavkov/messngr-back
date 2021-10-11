const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const resolvers = require('./src/resolvers');

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
