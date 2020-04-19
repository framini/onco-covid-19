import React from 'react';
import { Grid, Box, Alert, AlertIcon, AlertTitle } from '@chakra-ui/core';

import { Header } from '../components/header';
import { GlobalInfoProps } from '../types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BaseLayoutProps {
  children: React.ReactNode;
  globalInfo?: GlobalInfoProps;
}

export const BaseLayout = ({ children, globalInfo }: BaseLayoutProps) => {
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
        {globalInfo &&
          globalInfo.showGlobalAnnouncement &&
          globalInfo.announcement && (
            <Alert
              status="warning"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              borderBottom="3px solid #DD6B20"
            >
              <Box maxW={700} alignContent="center">
                <AlertIcon />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  {globalInfo.announcement.fields.title}
                </AlertTitle>

                {documentToReactComponents(
                  globalInfo.announcement.fields.content,
                )}
              </Box>
            </Alert>
          )}

        {children}
      </Box>
    </Grid>
  );
};
