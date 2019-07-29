import { BaseBrowserRepository } from '../types/base-repository';
import { ITransferTransaction, EEntityName } from '../../shared/types';

export class TransferTransactionsRepository
  extends BaseBrowserRepository<ITransferTransaction> {
  public entityName = EEntityName.TransferTransactions;
}
