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
import TaskTypeValidationPipe from './pipes/task-type-validation.pipe';
import FilterTasksDto from './dto/filter-tasks.dto';
import TasksService from './tasks.service';
import Task from './task.entity';

@Controller('tasks')
export default class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get('/getAllTasks')
  // getAllTasks(@Query(ValidationPipe) filterDto: FilterTasksDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getAllTasksWithFilter(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

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

  // @Patch('/task/:id/type')
  // @UsePipes(TaskTypeValidationPipe)
  // updateTaskstatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskTypeById(id, status);
  // }
}
