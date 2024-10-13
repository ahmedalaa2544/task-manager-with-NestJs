import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectDbService } from './project-db.service';
import { Project, projectSchema } from './project.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: projectSchema }]),
  ],
  providers: [ProjectDbService],
  exports: [ProjectDbService],
})
export class ProjectDbModule {}
