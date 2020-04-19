import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

type CenteredContentProps = BoxProps;

export const CenteredContent = (props: CenteredContentProps) => {
  return (
    <Box maxW="1080px" margin="0 auto" padding="10px" {...props}>
      {props.children}
    </Box>
  );
};
