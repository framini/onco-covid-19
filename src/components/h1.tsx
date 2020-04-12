import React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/core';

type H1Props = HeadingProps;

export const H1 = (props: H1Props) => {
  return (
    <Heading
      as="h1"
      size={'lg'}
      color="blue.800"
      maxW={['100%', '80%', '700px']}
      textAlign="center"
      {...props}
    >
      {props.children}
    </Heading>
  );
};
