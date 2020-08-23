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
  ParseIntPipe,
} from '@nestjs/common';
import CreateTaskDto from './dto/create-task.dto';
import TaskStatusValidationPipe from './pipes/task-type-validation.pipe';
import FilterTasksDto from './dto/filter-tasks.dto';
import TasksService from './tasks.service';
import Task from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export default class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getTasks(@Query(ValidationPipe) filterDto: FilterTasksDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Post('/createTask')
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  removeInstrument(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskstatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskTypeById(id, status);
  }
}
