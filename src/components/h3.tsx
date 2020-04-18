import React from 'react';
import { Heading, HeadingProps, BoxProps } from '@chakra-ui/core';

type H3Props = HeadingProps & BoxProps;

export const H3 = (props: H3Props) => {
  return (
    <Heading
      as="h3"
      fontSize={['1.25rem', '1.45rem', '1.7rem']}
      size={'lg'}
      color="blue.800"
      {...props}
    >
      {props.children}
    </Heading>
  );
};
