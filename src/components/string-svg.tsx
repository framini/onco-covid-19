import React from 'react';
import { Box } from '@chakra-ui/core';

interface StringSvgProps {
  content: string;
}

export const StringSvg = (props: StringSvgProps) => {
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: props.content,
      }}
    />
  );
};
