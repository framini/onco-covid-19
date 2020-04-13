import React from 'react';
import { Grid, Box } from '@chakra-ui/core';

import { Header } from '../components/header';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Grid
      templateAreas={['"header" "content"']}
      templateRows={['60px 1fr', '80px 1fr']}
      height="100vh"
    >
      <Box gridArea="header">
        <Header />
      </Box>

      <Box as="main" gridArea="content">
        {children}
      </Box>
    </Grid>
  );
};
