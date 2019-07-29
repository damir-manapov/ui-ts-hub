// tslint:disable:max-line-length
import { createDB } from '../lib/server/utils/create-db';
import { ITicketBuyInformationRecord } from './types';
import { EEntityName } from '../lib/shared/types';

export const boughtTickets = createDB<ITicketBuyInformationRecord>('bought_tickets' as EEntityName);
