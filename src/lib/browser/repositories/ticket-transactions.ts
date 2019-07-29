import { BaseBrowserRepository } from '../types/base-repository';
import { ITicketTransaction, EEntityName } from '../../shared/types';

export class TicketTransactionsRepository
  extends BaseBrowserRepository<ITicketTransaction> {
  public entityName = EEntityName.TicketTransactions;
}
