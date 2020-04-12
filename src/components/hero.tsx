import React from 'react';
import { Box, BoxProps, Grid, Stack, Text } from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';

import { H1 } from './h1';
import { documentToReactComponents } from '../utils/documentToReactComponents';

type HeroProps = {
  children: React.ReactNode;
} & BoxProps;

const Hero = ({ color = 'white', ...restProps }: HeroProps) => {
  return (
    <Box color={color} background="white" {...restProps}>
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
        display={['none', 'none', 'block']}
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
  return (
    <Hero {...props}>
      <Grid
        templateAreas={['"title" "image"', '"title" "image"', '"title image"']}
        gridTemplateColumns={['1fr', '1fr', '1.5fr 1fr']}
        height="100%"
        alignItems="center"
      >
        <Box padding={10}>
          <H1 gridArea="title">{props.title}</H1>
        </Box>
        <Hero.Image gridArea="image" backgroundColor="blue.100">
          {props.children}
        </Hero.Image>
      </Grid>
    </Hero>
  );
};

type HeroSectionProps = {
  title: string;
  description: Document;
} & BoxProps;

const HeroSection = (props: HeroSectionProps) => {
  return (
    <Hero backgroundColor="blue.100" {...props}>
      <Stack spacing={4} maxWidth={['90%', '70%']} paddingY={10} marginX="auto">
        <H1 color="blue.900">{props.title}</H1>

        <Text color="gray.700">
          {documentToReactComponents(props.description)}
        </Text>
      </Stack>
    </Hero>
  );
};

Hero.Image = HeroImage;

export { Hero, HeroWithImage, HeroSection };
