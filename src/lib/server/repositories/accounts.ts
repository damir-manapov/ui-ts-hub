import { BaseServerRepository } from '../types/base-repository';
import { IAccount, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const accountsDB = createDB<IAccount>(EEntityName.Accounts);

export class AccountsRepository extends BaseServerRepository<IAccount> {
  protected db = accountsDB;
  public entityName = EEntityName.Accounts;
}
