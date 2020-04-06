import React from 'react';
import { Link } from '@chakra-ui/core';
import NextLink, { LinkProps } from 'next/link';

type NavLink = {
  children: React.ReactNode;
} & LinkProps;

export const NavLink = (props: NavLink) => {
  const { children, ...restProps } = props;
  return (
    <NextLink {...restProps}>
      <Link>{children}</Link>
    </NextLink>
  );
};
