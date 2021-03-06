import { UserResolver } from './resolvers/user';
// https://github.com/MichalLytek/type-graphql/tree/v1.0.0/examples/typegoose

import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import mongoose from 'mongoose';

import { PostResolver, UserResolver } from './resolvers';
import { Context } from './types';

let apolloServer = null;
const app = express();

app.use((err: Error, _: Request, res: Response, _1: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 4200;

async function startServer() {
  try {
    apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [PostResolver, UserResolver],
        validate: false,
      }),
      context: (): Context => ({ message: 'Connected' }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI!);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log('Server error', err.message);
    process.exit(1);
  }
}
startServer();
