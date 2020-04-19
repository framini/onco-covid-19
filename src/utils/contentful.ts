import { Entry } from 'contentful';

export const getContentType = <T>(entry: Entry<T>) => {
  return entry.sys.contentType?.sys.type;
};

export const createArrayFromString = (value: string) => {
  return value.split(',').map((v) => v.trim());
};
