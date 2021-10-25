import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Post, PostModel } from '../entities/Post';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await PostModel.find({});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: string) {
    return PostModel.findById(id);
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg('title') title: string,
    @Arg('description', { nullable: true }) description: string
  ): Promise<Post | null> {
    try {
      const post = (
        await PostModel.create({
          title,
          description,
          createdAt: new Date(),
        })
      ).save();

      return post;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: string,
    @Arg('title', () => String, { nullable: true }) title?: string
  ): Promise<Post | null> {
    try {
      return await PostModel.findOneAndUpdate(
        { _id: id },
        { title },
        { new: true }
      );
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: string): Promise<boolean> {
    let result = null;

    try {
      result = await PostModel.findByIdAndDelete({ _id: id });
    } catch (err) {
      return false;
    }

    return !!result;
  }
}
