import { KnownRoutes, RouteDef } from '../types';

type PathsConfig = Record<KnownRoutes, RouteDef>;

export const routesConfig: PathsConfig = {
  home: {
    href: '/',
    name: '',
  },
  'pacientes-en-tratamiento': {
    href: '/pacientes-en-tratamiento',
    name: 'Pacientes en Tratamiento',
  },
  contacto: {
    href: '/contacto',
    name: 'Contacto',
  },
  'preguntas-frecuentes': {
    href: '/preguntas-frecuentes',
    name: 'Preguntas Frecuentes',
  },
  'recomendaciones-psico-oncologia': {
    href: '/recomendaciones-psico-oncologia',
    name: 'Recomendaciones de Psico-Oncología',
  },
};
