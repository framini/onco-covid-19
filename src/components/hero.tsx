import React from 'react';
import { Box, BoxProps, Grid, Stack, Text, useTheme } from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';

import { H1 } from './h1';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { useIsWide } from '../hooks/use-is-wide';

type HeroProps = {
  children: React.ReactNode;
} & BoxProps;

const Hero = ({ color = 'white', ...restProps }: HeroProps) => {
  return (
    <Box color={color} width="100%" background="white" {...restProps}>
      {restProps.children}
    </Box>
  );
};

type HeroImageProps = {
  children: React.ReactNode;
} & BoxProps;

const HeroImage = (props: HeroImageProps) => {
  return (
    <Box pos="relative" overflow="hidden" {...props}>
      <Box
        position="absolute"
        top={0}
        left={0}
        as="svg"
        fill="currentColor"
        // @ts-ignore
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        h="100%"
        display={['none', 'none', 'none', 'block']}
      >
        <polygon points="0,0 25,0 0,100 0,100"></polygon>
      </Box>
      <Box display="flex" justifyContent="center">
        {props.children}
      </Box>
    </Box>
  );
};

type HeroWithImageProps = {
  title: string;
} & BoxProps;

const HeroWithImage = (props: HeroWithImageProps) => {
  const isWide = useIsWide();

  const titleColor = !isWide
    ? {
        color: 'white',
      }
    : {};

  return (
    <Hero {...props}>
      <Grid
        display={['block', 'block', 'block', 'grid']}
        templateAreas={['"title image"']}
        gridTemplateColumns={['1.5fr 1fr']}
        height="100%"
        alignItems="center"
        position="relative"
        overflow="hidden"
      >
        <Box
          paddingX={[5, 60, 60, 10]}
          paddingY={20}
          position="relative"
          zIndex={1}
          backgroundColor={[
            'rgba(0, 65, 112, 0.7)',
            'rgba(0, 65, 112, 0.7)',
            'rgba(0, 65, 112, 0.7)',
            'transparent',
          ]}
        >
          <H1 gridArea="title" {...titleColor}>
            {props.title}
          </H1>
        </Box>
        <Hero.Image
          gridArea="image"
          backgroundColor="blue.100"
          position={['absolute', 'absolute', 'absolute', 'relative']}
          top={0}
          left={0}
          width={['100%', '100%', '100%', 'auto']}
        >
          {props.children}
        </Hero.Image>
      </Grid>
    </Hero>
  );
};

type HeroSectionProps = {
  title: string;
  description?: Document;
} & BoxProps;

const HeroSection = (props: HeroSectionProps) => {
  return (
    <Hero backgroundColor="blue.100" {...props}>
      <Stack
        spacing={4}
        maxWidth={['90%', '70%']}
        paddingY={[5, 5, 10]}
        marginX="auto"
      >
        <H1 color="blue.900">{props.title}</H1>

        {props.description && (
          <Text color="gray.700">
            {documentToReactComponents(props.description)}
          </Text>
        )}
      </Stack>
    </Hero>
  );
};

type HeroSplitContent = BoxProps;

const HeroSplitContent = (props: HeroSplitContent) => {
  return (
    <Hero height="100%" color="gray.600" {...props}>
      <Grid
        templateAreas={['"row1" "row2"', '"row1" "row2"', '"row1 row2"']}
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
        height="100%"
      >
        {props.children}
      </Grid>
    </Hero>
  );
};

HeroSplitContent.Col = (props: BoxProps) => {
  return <Box {...props}>{props.children}</Box>;
};

Hero.Image = HeroImage;

export { Hero, HeroWithImage, HeroSection, HeroSplitContent };
