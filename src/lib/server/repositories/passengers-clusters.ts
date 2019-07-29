import { BaseServerRepository } from '../types/base-repository';
import { IPassengersCluster, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const passengersClustersDB = createDB<IPassengersCluster>(
  EEntityName.PassengersClusters,
);

export class PassengersClustersRepository
  extends BaseServerRepository<IPassengersCluster> {
  protected db = passengersClustersDB;
  public entityName = EEntityName.PassengersClusters;
}
