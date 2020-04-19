import { NextPage } from 'next';

import { PageWithGlobalProps } from '../types';

export const isPageWithGlobalProps = (
  page: NextPage,
): page is PageWithGlobalProps<any> => {
  return 'getGlobalProps' in page;
};
