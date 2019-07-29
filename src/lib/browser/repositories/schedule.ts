import { BaseBrowserRepository } from '../types/base-repository';
import { ISchedule, EEntityName } from '../../shared/types';

export class ScheduleRepository extends BaseBrowserRepository<ISchedule> {
  public entityName = EEntityName.Schedule;
}
