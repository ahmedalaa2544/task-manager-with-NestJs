import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/user-db/user.schema';
@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  from: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  to: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

export const messageSchema = SchemaFactory.createForClass(Message);
// // Module
// export const UserDbModule = MongooseModule.forFeature([
//   { name: User.name, schema: UserSchema },
// ]);
