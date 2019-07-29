// tslint:disable:max-line-length
import { IBaseSchema } from './base-schema';
import { ISelector } from '../../server/types/pouchdb-find';

type TWithPouchMeta<Entity> = Entity & {
  _id: string;
  _rev: string;
};

interface IGetListOptions {
  filter?: ISelector;
  limit?: number;
  offset?: number;
}

interface ISharedBaseRepository<Schema extends IBaseSchema> {
  entityName: EEntityName;

  getById(id: Schema['id']): Promise<TWithPouchMeta<Schema> | null>;

  getCount(): Promise<number>;

  getList(options?: IGetListOptions): Promise<Array<TWithPouchMeta<Schema>>>;

  insert(data: Schema): Promise<TWithPouchMeta<Schema>>;

  update(data: TWithPouchMeta<Schema>): Promise<TWithPouchMeta<Schema>>;

  delete(id: Schema['id']): Promise<TWithPouchMeta<Schema>>;
}

enum ERepositoryRoutes {
  GetById = 'get-by-id',
  GetCount = 'get-count',
  GetList = 'get-list',
  Insert = 'insert',
  Update = 'update',
  Delete = 'delete',
}

enum EAgentClientRoutes {
  SearchTickets = 'search-tickets',
  BuyTicket = 'buy-ticket',
}

enum EEntityName {
  Accounts = 'accounts',
  Agents = 'agents',
  AgenciesCommissions = 'agencies-commissions',
  Airlines = 'airlines',
  Airports = 'airports',
  Cities = 'cities',
  Classes = 'classes',
  Clusters = 'clusters',
  FareBases = 'fare-bases',
  Flights = 'flights',
  Passengers = 'passengers',
  PassengersClusters = 'passengers-clusters',
  PersonalTariffs = 'personal-tariffs',
  Schedule = 'schedule',
  SweetcaseCommissions = 'sweetcase-commissions',
  TicketTransactions = 'ticket-transactions',
  Tickets = 'tickets',
  TransferTransactions = 'transfer-transactions',
  Users = 'users',
}

export {
  ISharedBaseRepository,
  IGetListOptions,
  TWithPouchMeta,
  EEntityName,
  ERepositoryRoutes,
  EAgentClientRoutes,
};
