import { BaseBrowserRepository } from '../types/base-repository';
import { IUser, EEntityName } from '../../shared/types';

export class UsersRepository
  extends BaseBrowserRepository<IUser> {
  public entityName = EEntityName.Users;
}
