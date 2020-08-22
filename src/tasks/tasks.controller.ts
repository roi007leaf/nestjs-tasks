/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import CreateTaskDto from './dto/create-task.dto';
import TaskTypeValidationPipe from './pipes/task-type-validation.pipe';
import FilterTasksDto from './dto/filter-tasks.dto';
import TasksService from './tasks.service';

@Controller('tasks')
export default class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/getAllTasks')
  getAllTasks(@Query(ValidationPipe) filterDto: FilterTasksDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getAllTasksWithFilter(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Post('/createTask')
  @UsePipes(ValidationPipe)
  addNewInstrument(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTasktById(id);
  }

  @Delete('/:id')
  removeInstrument(@Param('id') id: string): void {
    return this.tasksService.removeTask(id);
  }

  @Patch('/task/:id/type')
  @UsePipes(TaskTypeValidationPipe)
  updateTaskstatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskTypeById(id, status);
  }
}
