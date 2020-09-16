import React from 'react';
import {
  Grid,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  useTheme,
} from '@chakra-ui/core';

import { Header } from '../components/header';
import { GlobalInfoProps } from '../types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Footer } from '../components/footer';
import { useScript } from '../hooks/use-script';

interface BaseLayoutProps {
  children: React.ReactNode;
  globalInfo?: GlobalInfoProps;
}

export const BaseLayout = ({ children, globalInfo }: BaseLayoutProps) => {
  const theme = useTheme();

  useScript(
    'https://s.cliengo.com/weboptimizer/5f60cbfb109f56002af2cf50/5f60fb7b109f56002af2e3e1.js',
  );

  return (
    <Grid
      templateAreas={['"header" "content" "footer"']}
      templateRows={['60px 1fr 80px', '80px 1fr 60px']}
      height="100vh"
    >
      <Box gridArea="header">
        <Header menu={globalInfo?.menu} />
      </Box>

      <Box as="main" gridArea="content">
        {globalInfo &&
          globalInfo.showGlobalAnnouncement &&
          globalInfo.announcement && (
            <Alert
              status="info"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              maxW="auto"
              boxShadow="inset 0px -1px 5px rgba(189, 206, 219, 0.4)"
              backgroundColor={theme.colors.teal[100]}
            >
              <Box
                position="absolute"
                top={2}
                left={2}
                borderRadius="50%"
                backgroundColor="white"
                width="30px"
                height="30px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <AlertIcon m={0} />
              </Box>
              <Box p={2} alignContent="center">
                <AlertTitle mb={2} fontSize="lg">
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

      <Footer gridArea="footer" content={globalInfo?.footer} />
    </Grid>
  );
};
