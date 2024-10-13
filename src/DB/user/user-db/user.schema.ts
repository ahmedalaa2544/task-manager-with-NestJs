import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop({ enum: ['admin', 'manager', 'user'], default: 'user' })
  role: string;
}

export const userSchema = SchemaFactory.createForClass(User);
// // Module
// export const UserDbModule = MongooseModule.forFeature([
//   { name: User.name, schema: UserSchema },
// ]);
