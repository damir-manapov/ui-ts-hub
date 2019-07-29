import { BaseServerRepository } from '../types/base-repository';
import { ITicketTransaction, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const ticketTransactionsDB =
  createDB<ITicketTransaction>(EEntityName.TicketTransactions);

export class TicketTransactionsRepository
  extends BaseServerRepository<ITicketTransaction> {
  protected db = ticketTransactionsDB;
  public entityName = EEntityName.TicketTransactions;
}
