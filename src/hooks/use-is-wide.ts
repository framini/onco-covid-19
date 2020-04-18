import { useMedia } from 'react-use';
import { useTheme } from '@chakra-ui/core';

export const useIsWide = () => {
  const theme = useTheme();

  // @ts-ignore
  const isWide = useMedia(`(min-width: ${theme.breakpoints[2]})`);

  return isWide;
};
