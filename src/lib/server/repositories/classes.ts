import { BaseServerRepository } from '../types/base-repository';
import { IClass, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const classesDB = createDB<IClass>(EEntityName.Classes);

export class ClassesRepository extends BaseServerRepository<IClass> {
  protected db = classesDB;
  public entityName = EEntityName.Classes;
}
