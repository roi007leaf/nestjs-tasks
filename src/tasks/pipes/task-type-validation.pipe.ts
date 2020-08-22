import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export default class TaskTypeValidationPipe implements PipeTransform {
  readonly ACCEPTED_STATUS = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string): string {
    const lowerCasedValue = value.toLowerCase();
    if (!this.isTypeValid(lowerCasedValue)) {
      throw new BadRequestException(`${lowerCasedValue} is an invalid type`);
    }
    return value;
  }

  private isTypeValid(type: any) {
    return this.ACCEPTED_STATUS.includes(type);
  }
}
