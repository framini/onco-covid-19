import React from 'react';
import { Heading, HeadingProps, BoxProps } from '@chakra-ui/core';

type H1Props = HeadingProps & BoxProps;

export const H1 = (props: H1Props) => {
  return (
    <Heading
      as="h1"
      fontSize={['1.7rem', '1.85rem', '2.5rem']}
      size={'lg'}
      color="blue.800"
      textAlign="center"
      {...props}
    >
      {props.children}
    </Heading>
  );
};
