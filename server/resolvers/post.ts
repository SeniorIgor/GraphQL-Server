import { Resolver, Query, Arg, Ctx, Mutation } from 'type-graphql';
import { Context } from 'types';
import { Post } from '../entities/Post';
import {
  addPost,
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from '../db';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Post[] {
    return getPosts();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: string): Post | undefined {
    return getPostById(id);
  }

  // async for example
  @Mutation(() => Post)
  async createPost(
    @Ctx() ctx: Context,
    @Arg('title') title: string
  ): Promise<Post> {
    const post: Post = createPost(title, ctx.message);
    addPost(post);
    return post;
  }

  // async for example
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: string,
    @Arg('title', () => String, { nullable: true }) title?: string
  ): Promise<Post | null> {
    const post = getPostById(id);

    if (!post) {
      return null;
    }

    if (title) {
      post.title = title;
      updatePost(id, post);
    }

    return post;
  }

  // async for example
  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: string): Promise<boolean> {
    return deletePost(id);
  }
}
