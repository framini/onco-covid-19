import React from 'react';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';
import NextLink, { LinkProps } from 'next/link';

type Link = {
  children: React.ReactNode;
} & LinkProps;

export const Link = (props: Link) => {
  const theme = useTheme();
  const { children, href, passHref = true, as, ...restProps } = props;

  return (
    <NextLink href={href} passHref={passHref} as={as}>
      <ChakraLink
        color={theme.colors.purple[500]}
        fontWeight={600}
        {...restProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
