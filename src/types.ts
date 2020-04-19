import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { ParsedUrlQuery } from 'querystring';
import { NextPage } from 'next';

export type GlobalInfoProps = EntryGlobalInfo['fields'] & {
  showGlobalAnnouncement?: boolean;
};

export type EntryGlobalInfo = Entry<{
  title: string;
  announcement: EntryAnnouncement;
  footer: Document;
}>;

export type EntryFAQSection = Entry<{
  title: string;
  description: any;
  questions: EntryAdvice[];
  moreInfo: Document;
}>;

export type EntryAdvice = Entry<{
  title: string;
  content: Document;
  moreInfo: any;
}>;

export type EntryAnnouncement = Entry<{
  title: string;
  content: Document;
}>;

export type EntryLink = Entry<{
  title: string;
  content: RouteDef & {
    query?: ParsedUrlQuery;
  };
}>;

export type KnownRoutes =
  | 'home'
  | 'pacientes-en-tratamiento'
  | 'contacto'
  | 'preguntas-frecuentes'
  | 'recomendaciones-psico-oncologia'
  | 'generic-page';

export interface RouteDef {
  pattern?: boolean;
  href: string;
  name?: string;
}

export type PageWithGlobalProps<T> = NextPage<T> & {
  getGlobalProps: (pageProps: T) => GlobalInfoProps;
};

export type BasePage<T> = {
  globalInfo: GlobalInfoProps;
  pageContent: T & {
    globalAnnouncement?: boolean;
  };
};

export interface GenericEntryPage {
  title: string;
  slug: string;
  content: Document;
}
