import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/user-db/user.schema';
@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  post: string;
}

export const postSchema = SchemaFactory.createForClass(Post);
// // Module
