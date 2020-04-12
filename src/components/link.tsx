import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/core';
import NextLink, { LinkProps } from 'next/link';

type Link = {
  children: React.ReactNode;
} & LinkProps;

export const Link = (props: Link) => {
  const { children, href, passHref, as, ...restProps } = props;

  return (
    <NextLink href={href} passHref={passHref} as={as}>
      <ChakraLink {...restProps}>{children}</ChakraLink>
    </NextLink>
  );
};
