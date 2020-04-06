import { NextPageContext } from 'next';
import { Grid, Stack, Heading, Box } from '@chakra-ui/core';

import { Advice } from '../types';
import { Card } from '../components/card';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';

interface PacientesEnTratamientoProps {
  title: string;
  info: Advice[];
}

const Home = (props: PacientesEnTratamientoProps) => {
  return (
    <CenteredContent>
      <Stack spacing={8} alignItems="center">
        <Heading
          as="h1"
          size={'lg'}
          color="green.500"
          maxW={['100%', '80%', '700px']}
          textAlign="center"
        >
          {props.title}
        </Heading>
      </Stack>
    </CenteredContent>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { client } = require('../contentful/client');

  const entry = await client.getEntry('hXBelglMzWYcbpwYBEhiW');

  return {
    props: {
      ...entry.fields,
    },
  };
}

export default Home;
