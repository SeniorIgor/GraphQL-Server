import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Post {
  @Field(() => ID)
  @Property()
  id!: string;

  @Field(() => String)
  @Property({ default: new Date() })
  createdAt: Date;

  @Field(() => String)
  @Property({ required: true })
  title!: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  description?: string;
}

export const PostModel = getModelForClass(Post);
