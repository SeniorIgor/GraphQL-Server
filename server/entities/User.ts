import { ObjectType, Field } from 'type-graphql';
import { Schema } from 'mongoose';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

const { Types } = Schema;

@ObjectType()
export class User {
  @Field(() => String)
  readonly _id!: string;

  @Field()
  @Property({ required: true, unique: true })
  name: string;

  @Field()
  @Property({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Property({ type: Types.Date, default: new Date() })
  createdAt: Date;

  @Field(() => String)
  @Property({ type: Types.Date, default: new Date() })
  updatedAt: Date;

  @Property({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
