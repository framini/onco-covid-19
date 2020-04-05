import React from 'react';
import { Box, BoxProps, Heading } from '@chakra-ui/core';

type CardTitleProps = BoxProps;

const CardTitle = (props: CardTitleProps) => {
  return (
    <Heading as="h2" color="green.700" size="md">
      {props.children}
    </Heading>
  );
};

type CardProps = BoxProps;

export const Card = (props: CardProps) => {
  return (
    <Box p={['20px', '20px', '30px']} shadow="md" borderRadius="2px" {...props}>
      {props.children}
    </Box>
  );
};

Card.Title = CardTitle;
