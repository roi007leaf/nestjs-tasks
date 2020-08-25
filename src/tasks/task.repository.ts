import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import User from '../auth/user.entity';
import CreateTaskDto from './dto/create-task.dto';
import FilterTasksDto from './dto/filter-tasks.dto';
import { TaskStatus } from './task-status.enum';
import Task from './task.entity';

@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  private task: Task;

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    this.task = new Task();
    this.task.title = title;
    this.task.description = description;
    this.task.status = TaskStatus.OPEN;
    this.task.user = user;

    try {
      await this.task.save();
      delete this.task.user;
      return this.task;
    } catch (error) {
      this.logger.error(
        `Failed to create a task for user ${
          user.username
        }, Data: ${JSON.stringify(createTaskDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTasks(filterDto: FilterTasksDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${
          user.username
        }, Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Task With ID ${id} isn't found`);
    }
    delete found.userId;
    return found;
  }

  async updateTaskStatusById(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    this.task = await this.getTaskById(id, user);
    this.task.status = status;
    await this.task.save();
    return this.task;
  }
}
