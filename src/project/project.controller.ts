import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProjectService } from './project.service';
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post('')
  create(@Body() body: any) {
    return this.projectService.create(body);
  }
}
