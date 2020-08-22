import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import CreateTaskDto from './dto/create-task.dto';
import FilterTasksDto from './dto/filter-tasks.dto';
import TaskRepository from './task.repository';
import Task from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export default class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Task With ID ${id} isn't found`);
    }
    return found;
  }

  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }
  //   getAllTasksWithFilter(filterDto: FilterTasksDto): Task[] {
  //     let tasks = [];
  //     const { status, search } = filterDto;
  //     if (status) {
  //       tasks = this.tasks.filter(task => {
  //         return task.status === status;
  //       });
  //     }
  //     if (search) {
  //       tasks = tasks.filter(task => {
  //         return task.name.includes(search);
  //       });
  //     }
  //     return tasks;
  //   }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task With ID ${id} isn't found`);
    }
  }
  //   updateTaskTypeById(id: string, status: TaskStatus): Task {
  //     const task = this.getTasktById(id);
  //     task.status = status;
  //     return task;
  //   }
  // }
}
