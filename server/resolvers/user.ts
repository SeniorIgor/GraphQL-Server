import { Resolver, Arg, Mutation, InputType, Field } from 'type-graphql';
import bcrypt from 'bcrypt';

import { User, UserModel } from '../entities/User';

@InputType()
class EmailAndPasswordInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') options: EmailAndPasswordInput
  ): Promise<boolean> {
    const { name, email, password } = options;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      (
        await UserModel.create({
          name,
          email,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ).save();
    } catch (err) {
      return false;
    }

    return true;
  }

  // @Query(() => Post, { nullable: true })
  // post(@Arg('id') id: string) {
  //   return PostModel.findById(id);
  // }

  // @Mutation(() => Post, { nullable: true })
  // async createPost(
  //   @Arg('title') title: string,
  //   @Arg('description', { nullable: true }) description: string
  // ): Promise<Post | null> {
  //   try {
  //     const post = (
  //       await PostModel.create({
  //         title,
  //         description,
  //         createdAt: new Date(),
  //       })
  //     ).save();

  //     return post;
  //   } catch (err) {
  //     return null;
  //   }
  // }

  // @Mutation(() => Post, { nullable: true })
  // async updatePost(
  //   @Arg('id') id: string,
  //   @Arg('title', () => String, { nullable: true }) title?: string
  // ): Promise<Post | null> {
  //   try {
  //     return await PostModel.findOneAndUpdate(
  //       { _id: id },
  //       { title },
  //       { new: true }
  //     );
  //   } catch (err) {
  //     return null;
  //   }
  // }

  // @Mutation(() => Boolean)
  // async deletePost(@Arg('id') id: string): Promise<boolean> {
  //   let result = null;

  //   try {
  //     result = await PostModel.findByIdAndDelete({ _id: id });
  //   } catch (err) {
  //     return false;
  //   }

  //   return !!result;
  // }
}
