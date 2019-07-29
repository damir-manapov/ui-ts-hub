# SSR Server Template
## Getting started

The main purpose of this repository is to show React developers how to 
create really cool good-optimized SEO applications. I have tried to
create project with minimal functionality. So, the other things are on your
shoulders now.

According to yarn scripts, you can see that project entry point is 
`src/server/index.ts`. An Express + Next server is running right there.

There is a built-in device detection and client config pass in express handlers.
Last Express handler is Next handler which tries to find route, we stated 
before.

If you just cloned this repository, dont forget to install dependencies via
`yarn install`.

## Technologies stack
- TypeScript
- Next JS
- JSS
- Material UI
- React JS
- Redux
- Express JS

## Features
- Mobile detection
- SEO-ready application

## Scripts

- `yarn dev` - run development version.
- `yarn lint` - check lint errors.
- `yarn lint-fix` - find lint errors and try to fix them.
- `yarn build` - build production version.
- `yarn start` - run production version.

## How to?
### Create new page
- Add new page to `ENextPage` (`src/types/next.ts`). `ENextPage.Article = '/article'`, for example.
- Add new route to `src/server/routes.ts`
```json
{
  "name": "Article",
  "href": "/article",
  "as": "/article",
  "page": ENextPage.Article
}
```
- Create page file in `src/pages` (`article.tsx`). There you will have only
Next page component which have to render your usual React component. It is
required to have a component to be written in `pages` directory, because
Next JS calls `getInitialProps` only for components written in this directory.
- The last stage is to create your React page component in 
`src/components/pages`. All other non-page components must be written in
components directory!
- That's all, folks! See [example](https://github.com/wolframdeus/ssr-server-template/blob/master/src/pages/about.tsx) 
if something went wrong.

### Pass meta tags depending on page we are currently on
According to Next JS documentation, there is a really good way to do it
through `<Head />` component. So, just pass `<Head />`, insert something like
```typescript jsx
import Head from 'next/head';

<Head>
  <meta name="robots" content="noindex, nofollow" />
</Head>
```

During initial page rendering, Next JS will automatically take your `<Head />` 
and pass it to `document.head``. 

### Set environment variables
Current project uses both `dotenv` and `cross-env` npm packages. So, `cross-env`
is required to set environment variables inside bash scripts for Windows and
*nix systems. 

`Dotenv` is used to set variables inside JS scripts. We have directory with
path `env`, containing 3 configuration files - `default.env`, `development.env`
and `production.env`. They contain information about required environment
variables. `default.env` is always being used by our project, but
`develpoment.env` and `production.env` are use depending on `DEPLOY_ENV` which
is set with `cross-env` in yarn scripts.
 
