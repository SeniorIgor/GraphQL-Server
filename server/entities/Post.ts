import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

// import { User } from './User';
// import { Ref } from '../types';

@ObjectType()
export class Post {
  @Field(() => ID)
  readonly _id!: string;

  @Field(() => String)
  @Property({ default: new Date() })
  createdAt: Date;

  @Field(() => String)
  @Property({ required: true })
  title!: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  description?: string;

  // @Field(() => User)
  // @Property({ ref: User, required: true })
  // author: Ref<User>;
}

export const PostModel = getModelForClass(Post);
