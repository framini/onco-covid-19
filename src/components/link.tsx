import React from 'react';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';
import NextLink, { LinkProps } from 'next/link';

type Link = {
  children: React.ReactNode;
  'aria-label'?: string;
} & LinkProps;

export const Link = (props: Link) => {
  const theme = useTheme();
  const { children, href, passHref = true, as, ...restProps } = props;

  return (
    <NextLink href={href} passHref={passHref} as={as}>
      <ChakraLink
        color={theme.colors.purple[500]}
        borderBottom={`2px solid ${theme.colors.purple[200]}`}
        fontWeight={600}
        textDecoration="none"
        _hover={{
          color: theme.colors.purple[600],
        }}
        {...restProps}
        aria-label={props['aria-label']}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
