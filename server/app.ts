import 'reflect-metadata';
import { HelloResolver, PostResolver } from './resolvers';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Context } from './types';
// import { connect } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4200;

let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: (): Context => ({ dataBase: 'Connection to database' }),
  });

  // const mongoose = await connect('mongodb://localhost:27017/test', {
  //   useNewUrlParser: true,
  // });
  // await mongoose.connection;

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.use((err: Error, _: Request, res: Response, _1: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
