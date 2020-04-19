import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = {
  ...chakraTheme.fonts,
  body: "'Open Sans', sans-serif",
  heading: "'PT Serif', serif",
};

const breakpoints = [
  '40em',
  '52em',
  '86em',
] as typeof chakraTheme['breakpoints'];

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
    blue: {
      50: '#f6fafd',
      100: '#e2eff9',
      200: '#cce4f5',
      300: '#b5d8f0',
      400: '#9bcaeb',
      500: '#7dbae5',
      600: '#5aa7de',
      700: '#2d8fd5',
      800: '#006fbe',
      900: '#004170',
    },
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
  },
};

export default theme;
