import { KnownRoutes } from '../types';
import { routesConfig } from '../config/routes';

export const isRouteActive = (
  routeProps: ReturnType<typeof getRouteProps>,
  pathname: string,
) => {
  if ('as' in routeProps) {
    return routeProps.as === pathname;
  }

  return routeProps.href === pathname;
};

export const buildAsPath = (pathname: string, params = {}) => {
  let nextPath = pathname;
  const query = JSON.parse(JSON.stringify(params));
  for (const key in query) {
    nextPath = nextPath.replace(
      new RegExp(`\\[(${key})\\]`, 'g'),
      (_match, p1) => {
        const value = query[p1];
        delete query[p1];
        return value;
      },
    );
  }

  return nextPath;
};

export const getRouteProps = (
  routeName: KnownRoutes,
  query: Record<string, string | string[]> = {},
) => {
  const path = routesConfig[routeName];

  if (path.pattern) {
    return {
      href: path.href,
      as: buildAsPath(path.href, query),
    };
  }

  return { href: path.href };
};
