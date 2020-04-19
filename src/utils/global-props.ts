import { BasePage } from '../types';

export const getGlobalProps = <T>(pageProps: BasePage<T>) => {
  return {
    ...pageProps.globalInfo,
    showGlobalAnnouncement: pageProps.pageContent.globalAnnouncement,
  };
};
