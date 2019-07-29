import { ERepositoryRoutes, EAgentClientRoutes } from './types';

/**
 * Возвращает URL использующийся для обработки запросов репозиториев, как
 * на клиентской, так и на серверной частях.
 * @param {string} entityName
 * @param {ERepositoryRoutes} method
 * @returns {string}
 */
export function getRepositoryMethodRoute(
  entityName: string,
  method: ERepositoryRoutes,
) {
  return `/${entityName}/${method}`;
}

/**
 * Возвращает маршруты для обработки запросов клиента агентов.
 * @param {EAgentClientRoutes} method
 * @returns {string}
 */
export function getAgentClientMethodRoute(
  method: EAgentClientRoutes,
) {
  return `/agent-client/${method}`;
}
