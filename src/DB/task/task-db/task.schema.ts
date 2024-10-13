import { Prop, Schema, SchemaFactory, MongooseModule } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/db/project/project-db/project.schema';
@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true, lowercase: true })
  title: string;
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Types.ObjectId;
  @Prop({ enum: ['admin', 'manager', 'user'], default: 'user' })
  status: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);
