import { BaseServerRepository } from '../types/base-repository';
import { IUser, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const usersDB = createDB<IUser>(EEntityName.Users);

export class UsersRepository extends BaseServerRepository<IUser> {
  protected db = usersDB;
  public entityName = EEntityName.Users;
}
