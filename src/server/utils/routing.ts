import { TExtendedRoutes, TNextQuery } from '../../shared/types';
import { Server } from 'next';

/**
 * Adds routes to application.
 * @param app
 * @param {TExtendedRoutes} routes
 */
export function addRoutes(app: Server, routes: TExtendedRoutes) {
  Object.values(routes).forEach(route => {
    // Add new custom route to router. Each page context will have
    // query parameter "page" which equals to page from EPage. It is useful
    // when you need to detect a page you are currently on.
    app.router.add({
      match: pathname => route.getParams(pathname) || false,
      fn: async (req, res, params, parsedUrl) => {
        const query = {
          ...params,
          ...parsedUrl.query as Record<string, string>,
        } as TNextQuery;

        return app.render(
          req,
          res,
          route.pathname,
          query,
        );
      },
    });

    // Recursively add other routes in case, they exist.
    if (route.routes) {
      addRoutes(app, route.routes);
    }
  });
}
