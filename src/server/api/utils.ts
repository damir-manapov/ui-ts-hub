import { BaseServerRepository } from '../../lib/server/types/base-repository';
import { Router } from 'express-serve-static-core';
import { getRepositoryMethodRoute } from '../../lib/shared/utils';
import { ERepositoryRoutes } from '../../lib/shared/types';

function bindRepositoryHandlers<Repository extends BaseServerRepository<{}>>(
  repository: Repository,
  server: Router,
) {
  const routesMap = {
    getById: ERepositoryRoutes.GetById,
    getCount: ERepositoryRoutes.GetCount,
    getList: ERepositoryRoutes.GetList,
    insert: ERepositoryRoutes.Insert,
    update: ERepositoryRoutes.Update,
    delete: ERepositoryRoutes.Delete,
  };
  const routes = Object.entries(routesMap).reduce((acc, [key, route]) => {
    acc[key] = getRepositoryMethodRoute(repository.entityName, route);

    return acc;
  }, {} as { [key in keyof typeof routesMap]: string });

  // GET BY ID
  server.get(routes.getById, async (req, res) => {
    res.json(await repository.getById(req.query.id));
  });

  // GET COUNT
  server.get(routes.getCount, async (_, res) => {
    res.json(await repository.getCount());
  });

  // GET LIST
  server.get(routes.getList, async (req, res) => {
    const { limit, offset } = req.query;

    res.json(await repository.getList({ limit, offset }));
  });

  // INSERT
  server.post(routes.insert, async (req, res) => {
    res.json(await repository.insert(req.body));
  });

  // UPDATE
  server.post(routes.update, async (req, res) => {
    res.json(await repository.update(req.body));
  });

  // DELETE
  server.post(routes.delete, async (req, res) => {
    res.json(await repository.delete(req.body.id));
  });
}

export { bindRepositoryHandlers };
