import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export default class TaskStatusValidationPipe implements PipeTransform {
  readonly ACCEPTED_STATUS = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string): string {
    if (!this.isTypeValid(value)) {
      throw new BadRequestException(`${value} is an invalid type`);
    }
    return value;
  }

  private isTypeValid(type: any) {
    return this.ACCEPTED_STATUS.includes(type);
  }
}
