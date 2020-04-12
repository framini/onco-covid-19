import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { ParsedUrlQuery } from 'querystring';

export type EntryAdvice = Entry<{
  title: string;
  content: Document;
}>;

export type EntryLink = Entry<{
  title: string;
  content: RouteDef & {
    query?: ParsedUrlQuery;
  };
}>;

export type KnownRoutes = 'home' | 'pacientes-en-tratamiento' | 'contacto';

export interface RouteDef {
  pattern?: boolean;
  href: string;
  name: string;
}
