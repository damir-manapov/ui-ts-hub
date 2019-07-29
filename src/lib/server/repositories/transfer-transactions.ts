import { BaseServerRepository } from '../types/base-repository';
import { ITransferTransaction, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const transferTransactionsDB =
  createDB<ITransferTransaction>(EEntityName.TransferTransactions);

export class TransferTransactionsRepository
  extends BaseServerRepository<ITransferTransaction> {
  protected db = transferTransactionsDB;
  public entityName = EEntityName.TransferTransactions;
}
