import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  createdAt?: Date;

  @Field(() => String)
  title!: string;
}
