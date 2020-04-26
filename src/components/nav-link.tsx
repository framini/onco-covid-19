import React from 'react';
import { LinkProps } from 'next/link';
import { css } from '@emotion/core';
import { useTheme } from '@chakra-ui/core';

import { Link } from './link';

type NavLink = {
  children: React.ReactNode;
  isActive?: boolean;
} & LinkProps;

const defaultStyles = css({
  padding: '5px 5px',
  border: 0,
  borderRadius: '4px',
  fontWeight: 600,
  '&:hover': {
    textDecoration: 'none',
  },
  ':focus': {
    boxShadow: `0 0 0 2px #9bcaeb`,
  },
});

export const NavLink = (props: NavLink) => {
  const { children, ...restProps } = props;
  const theme = useTheme();

  return (
    <Link
      css={[
        defaultStyles,
        {
          '&:hover': {
            color: theme.colors.gray[500],
          },
        },
        {
          color: theme.colors.gray[600],
        },
        props.isActive && {
          position: 'relative',
          color: theme.colors.gray[800],
          overflow: 'hidden',
          '&:after': {
            position: 'absolute',
            content: '""',
            width: '100%',
            bottom: '0px',
            left: 0,
            height: '2px',
            backgroundColor: theme.colors.blue[400],
          },
        },
      ]}
      {...restProps}
    >
      {children}
    </Link>
  );
};
