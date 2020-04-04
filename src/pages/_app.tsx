import React from 'react';
import App from 'next/app';
import { CacheProvider } from '@emotion/core';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from 'emotion';

import { BaseLayout } from '../layouts/base-layout';
import theme from '../themes/default';

export default class OncoCovid19App extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <ColorModeProvider>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </ColorModeProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }
}
