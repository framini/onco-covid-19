import React from 'react';

import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ['40em', '52em', '64em'];

const theme = {
  ...chakraTheme,
  shadows: {
    ...chakraTheme.shadows,
    sm: '0px 2px 13px rgba(52, 152, 140, 0.15)',
    md:
      '0px 2px 6px rgba(0, 0, 0, 0.03), 0px 4px 12px rgba(117, 194, 185, 0.10)',
  },
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
};

export default theme;
