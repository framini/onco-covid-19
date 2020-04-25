import React from 'react';
import { Heading, HeadingProps, BoxProps } from '@chakra-ui/core';

type H2Props = HeadingProps & BoxProps;

export const H2 = (props: H2Props) => {
  return (
    <Heading
      as="h2"
      fontSize={['1.5rem', '1.55rem', '1.9rem']}
      size={'lg'}
      color="blue.800"
      textAlign="center"
      {...props}
    >
      {props.children}
    </Heading>
  );
};
