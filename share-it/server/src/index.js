const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Feed = require("./resolvers/Feed");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Feed
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://us1.prisma.sh/sarah-g-936eeb/share-it/demo",
      // https://us1.prisma.sh/yukakagura-caa46c/share-it/demo
      secret: "mysecret111111",
      debug: true
    })
  })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
