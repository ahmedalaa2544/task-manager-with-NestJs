import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, projectSchema } from './project.schema';
import { Model, FilterQuery } from 'mongoose';
@Injectable()
export class ProjectDbService {
  constructor(
    @InjectModel(Project.name) private readonly _projectModel: Model<Project>,
  ) {}
  async create(object: any): Promise<Project> {
    return this._projectModel.create(object);
  }
}
