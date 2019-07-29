import { BaseServerRepository } from '../types/base-repository';
import { createDB } from '../utils/create-db';
import { ITicket, EEntityName } from '../../shared/types';

export const ticketsDB = createDB<ITicket>(EEntityName.Tickets);

export class TicketsRepository extends BaseServerRepository<ITicket> {
  protected db = ticketsDB;
  public entityName = EEntityName.Tickets;
}
