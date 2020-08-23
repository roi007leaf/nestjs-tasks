import { EntityRepository, Repository } from 'typeorm';

import User from '../auth/user.entity';
import CreateTaskDto from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import Task from './task.entity';

@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
