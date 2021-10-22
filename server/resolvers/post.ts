import { Resolver, Query, Ctx } from 'type-graphql';
import { Context } from 'types';
import { Post } from '../entities/Post';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: Context): Post {
    return {
      id: 1,
      title: ctx.dataBase,
      createdAt: new Date(),
    };
  }
}
