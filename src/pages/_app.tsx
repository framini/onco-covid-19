import React from 'react';
import App from 'next/app';
import { CacheProvider } from '@emotion/core';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from 'emotion';

import { BaseLayout } from '../layouts/base-layout';
import theme from '../themes/default';
import { isPageWithGlobalProps } from '../utils/layout';

export default class OncoCovid19App extends App {
  render() {
    const { Component, pageProps } = this.props;

    // This is just a workaround since `_app` doesn't allow
    // getStaticProps (yet)
    const globalProps = isPageWithGlobalProps(Component)
      ? Component.getGlobalProps(pageProps)
      : undefined;

    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <ColorModeProvider value="light">
            <BaseLayout globalInfo={globalProps}>
              <Component {...pageProps} />
            </BaseLayout>
          </ColorModeProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }
}
