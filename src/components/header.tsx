import React from 'react';
import { Box, Stack, useTheme } from '@chakra-ui/core';
import { FaBriefcaseMedical } from 'react-icons/fa';

export const Header = () => {
  const theme = useTheme();

  return (
    <Box as="header" height={['60px', '80px']} shadow="sm" p="20px">
      <Stack direction="row" alignItems="center" height="100%">
        <Box>
          <FaBriefcaseMedical
            style={{
              fill: theme.colors.green[500],
              width: '30px',
              height: '30px',
            }}
          />
        </Box>
        <Box marginLeft="auto"></Box>
      </Stack>
    </Box>
  );
};
