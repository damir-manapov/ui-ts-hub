import { BaseBrowserRepository } from '../types/base-repository';
import { IAccount, EEntityName } from '../../shared/types';

export class AccountsRepository extends BaseBrowserRepository<IAccount> {
  public entityName = EEntityName.Accounts;
}
