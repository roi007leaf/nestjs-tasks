import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
import CreateTaskDto from './dto/create-task.dto';
import FilterTasksDto from './dto/filter-tasks.dto';

@Injectable()
export default class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getAllTasksWithFilter(filterDto: FilterTasksDto): Task[] {
    let tasks = [];
    const { status, search } = filterDto;

    if (status) {
      tasks = this.tasks.filter(task => {
        return task.status === status;
      });
    }

    if (search) {
      tasks = tasks.filter(task => {
        return task.name.includes(search);
      });
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTasktById(id: string): Task {
    const foundInstrument = this.tasks.find(task => task.id === id);
    if (!foundInstrument) {
      throw new NotFoundException(`Instrument With ID ${id} isn't found`);
    }
    return foundInstrument;
  }

  removeTask(id: string): void {
    const foundInstrument = this.getTasktById(id);
    this.tasks = this.tasks.filter(task => {
      return task.id !== foundInstrument.id;
    });
  }

  updateTaskTypeById(id: string, status: TaskStatus): Task {
    const task = this.getTasktById(id);
    task.status = status;
    return task;
  }
}
