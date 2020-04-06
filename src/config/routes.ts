import { KnownRoutes } from '../types';

type PathsConfig = Record<
  KnownRoutes,
  {
    pattern?: boolean;
    href: string;
    name: string;
  }
>;

export const routesConfig: PathsConfig = {
  home: {
    href: '/',
    name: '',
  },
  'pacientes-en-tratamiento': {
    href: '/pacientes-en-tratamiento',
    name: 'Pacientes en Tratamiento',
  },
};
