import { BaseServerRepository } from '../types/base-repository';
import { ICluster, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const clustersDB = createDB<ICluster>(EEntityName.Clusters);

export class ClustersRepository extends BaseServerRepository<ICluster> {
  protected db = clustersDB;
  public entityName = EEntityName.Clusters;
}
