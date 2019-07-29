import { ENextPage, IServerRoute } from '../types';
import { routes } from '../routes';

/**
 * Returns route by Next Page name.
 * @param page
 */
export function getRouteByNextPage(page: ENextPage): IServerRoute {
  return routes.find(item => item.page === page);
}
