import React from 'react';
import { Document } from '@contentful/rich-text-types';
import { Box, BoxProps, Stack, useTheme } from '@chakra-ui/core';

import { documentToReactComponents } from '../utils/documentToReactComponents';

type FooterProps = {
  content?: Document;
} & BoxProps;

export const Footer = ({ content, ...restProps }: FooterProps) => {
  const theme = useTheme();

  return (
    <Box
      as="footer"
      p="10px"
      shadow="sm"
      color={theme.colors.gray['700']}
      {...restProps}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        <Box as="span">© {new Date().getFullYear()} </Box>
        {content && <Box as="span">{documentToReactComponents(content)}</Box>}
      </Stack>
    </Box>
  );
};
