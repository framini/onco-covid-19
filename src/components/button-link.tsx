import React from 'react';
import { Link as ChakraLink, useTheme } from '@chakra-ui/core';
import NextLink, { LinkProps } from 'next/link';

type ButtonLink = {
  children: React.ReactNode;
  'aria-label'?: string;
} & LinkProps;

export const ButtonLink = (props: ButtonLink) => {
  const theme = useTheme();
  const { children, href, passHref = true, as, ...restProps } = props;

  return (
    <NextLink href={href} passHref={passHref} as={as}>
      <ChakraLink
        {...restProps}
        padding="5px"
        borderRadius="4px"
        border="1px solid currentColor"
        fontSize="14px"
        fontWeight="600"
        color={theme.colors.purple[500]}
        _hover={{
          backgroundColor: 'rgba(128, 90, 213, 0.05)',
        }}
        aria-label={props['aria-label']}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
