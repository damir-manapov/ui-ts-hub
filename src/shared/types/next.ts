import { NextAppContext } from 'next/app';
import { NextContext } from 'next';
import { IResponse } from './server';
import { Store } from 'redux';
import { IReduxState } from '../redux';

interface IAppContext extends NextContext {
  res: IResponse;
}

export type TNextQuery = Record<string, string>;

export interface INextAppContext extends NextAppContext {
  ctx: IAppContext;
}

export interface INextPageContext extends IAppContext {
  store: Store<IReduxState>;
  query: TNextQuery;
}

export interface IRoute {
  /**
   * Page for client side, to detect the page we are currently on.
   */
  page: EPage;

  /**
   * Path to Next page.
   */
  pathname: ENextPage;

  /**
   * List of sub-routes.
   */
  routes?: TRoutes;
}

export interface IExtendedRoute extends IRoute {
  /**
   * List of extended sub-routes
   */
  routes?: TExtendedRoutes;

  /**
   * List of express params. Required for internal use.
   * (/:namespace/:slug, "namespace" and "slug" are params)
   */
  keyNames: string[];

  /**
   * Derives express params values from pathname.
   * @param pathname
   */
  getParams(pathname: string): Record<string, string> | null;

  /**
   * Converts route pattern to usual pathname.
   * For example: if pattern was /:namespace/:slug, call of
   * toPath({ namespace: 'news', slug: '9281110' }) will return
   * "/news/9281110". Be careful using this method, an error will be thrown
   * if data doesnt contain ALL stated in pattern params. In case, one of query
   * params is not used in pathname build, it will be added as
   * default query param - ex. ?slug=9281110.
   * @param data
   */
  toPath(data?: Record<string, string | number>): string;
}

export type TRoutes = Record<string, IRoute>;
export type TExtendedRoutes = Record<string, IExtendedRoute>;

/**
 * SOME INFORMATION ABOUT DIFFERENCE AND USER CASES BETWEEN ENextPage AND
 * EPage.
 *
 * You have to understand, that ENextPage is only an enum, containing routes
 * to Next pages. Its technical server thing, so it would be good, if you
 * will not use this enum on client side. For client cases, watch EPage.
 *
 * Saying about EPage, it is an enum which makes an equality:
 * 1 EPage enum = 1 server route.
 *
 * For example: We have something like FAQ page. There are some namespaces
 * where this FAQ pages exist. Something like /store/faq, /goods/faq,
 * /cars/faq etc. If we know, that all these routes are equal, but there is a
 * little difference only in realisation, we could use 1 next page instead
 * of 3 equal next pages (3 additional files in pages dir., omg) and 3 enums
 * in EPage.
 *
 * Overall, we just create a file ./src/pages/faq.tsx, detect namespace inside
 * and do what we want inside. We create ENextPage.FAQ = '/faq',
 * EPage.StoreFAQ (there is no difference which value is), EPage.CarsFAQ and
 * EPage.GoodsFAQ. And, finally, we create routes for these 3 EPage enums in
 * ./src/shared/routes.rs, to make server map EPage value to ENextPage page.
 *
 * Watch ./src/shared/routes.ts for better understanding.
 */

/**
 * Remember: 1 next page - 1 value
 */
export enum ENextPage {
  Home = '/home',
}

/**
 * Remember: 1 pattern (route) - 1 value
 */
export enum EPage {
  Home,
}
