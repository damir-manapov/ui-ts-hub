import * as pathToRegexp from 'path-to-regexp';
import {
  ENextPage,
  TRoutes,
  TExtendedRoutes,
  IExtendedRoute,
  EPage,
} from './types';

const routesRaw: TRoutes = {
  '/': {
    page: EPage.Home,
    pathname: ENextPage.Home,
  },
};

/**
 * Extends default routes and gives special fields.
 *
 * @param {TRoutes} rawRoutes
 * @param {string} prevPattern
 * @returns {any}
 */
function extendRoutes(rawRoutes: TRoutes, prevPattern = '') {
  return Object
    .entries(rawRoutes)
    .reverse()
    .reduce((acc, [pattern, route]) => {
      const currentPattern = prevPattern + pattern;
      const keys = [];
      const regExp = pathToRegexp(currentPattern, keys);
      const toPath = pathToRegexp.compile(currentPattern);
      const keyNames = keys.map(item => item.name);
      const newRoute = {
        ...route,
        keyNames,
        toPath,
        getParams: pathname => {
          const parsed = regExp.exec(pathname);

          if (!parsed || parsed.length !== keyNames.length + 1) {
            return null;
          }

          return keyNames.reduce((accum, key, idx) => {
            accum[key] = parsed[idx + 1];

            return accum;
          }, {});
        },
      } as IExtendedRoute;

      // Recursively extend all children routes.
      if (newRoute.routes) {
        newRoute.routes = extendRoutes(newRoute.routes, currentPattern);
      }

      acc[pattern] = newRoute;

      return acc;
    }, {} as TExtendedRoutes);
}

export const routes = extendRoutes(routesRaw);
