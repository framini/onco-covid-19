import { Document } from '@contentful/rich-text-types';
export interface Advice {
  fields: {
    title: string;
    content: Document;
  };
}
