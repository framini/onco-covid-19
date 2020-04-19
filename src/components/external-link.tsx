import React from 'react';
import { Link as ChakraLink, LinkProps, useTheme } from '@chakra-ui/core';

type ExternalLinkProps = {
  children: React.ReactNode;
} & LinkProps;

export const ExternalLink = (props: ExternalLinkProps) => {
  const theme = useTheme();
  const { children, ...restProps } = props;

  return (
    <ChakraLink
      color={theme.colors.purple[500]}
      fontWeight={600}
      {...restProps}
    >
      {children}
    </ChakraLink>
  );
};
