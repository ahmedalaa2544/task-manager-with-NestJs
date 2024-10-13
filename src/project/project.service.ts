import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ExecutionContext,
  UnprocessableEntityException,
  Req,
} from '@nestjs/common';
import { Project } from 'src/db/project/project-db/project.schema';
import { ProjectDbService } from 'src/db/project/project-db/project-db.service';

@Injectable()
export class ProjectService {
  constructor(private readonly _projectDbService: ProjectDbService) {}
  async create(body: any): Promise<Project> {
    const project = await this._projectDbService.create(body);
    return project;
  }
}
