import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/DB/user/user-db/user.schema';
@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, lowercase: true })
  name: string;
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  manager: Types.ObjectId;
}

export const projectSchema = SchemaFactory.createForClass(Project);
// // Module
// export const UserDbModule = MongooseModule.forFeature([
//   { name: User.name, schema: UserSchema },
// ]);
