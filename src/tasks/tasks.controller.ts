import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import User from '../auth/user.entity';
import CreateTaskDto from './dto/create-task.dto';
import FilterTasksDto from './dto/filter-tasks.dto';
import TaskStatusValidationPipe from './pipes/task-type-validation.pipe';
import { TaskStatus } from './task-status.enum';
import Task from './task.entity';
import TasksService from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export default class TasksController {
  private logger = new Logger('TaskController');

  constructor(private tasksService: TasksService) {}

  @Get('/')
  getTasks(
    @Query(ValidationPipe) filterDto: FilterTasksDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retreiving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user.username} creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe)
    id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  removeInstrument(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskstatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, status, user);
  }
}
