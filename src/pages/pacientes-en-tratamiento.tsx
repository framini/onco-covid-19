import { NextPageContext } from 'next';
import { Grid, Stack, Heading, Box, Text } from '@chakra-ui/core';

import { EntryAdvice } from '../types';
import { Card } from '../components/card';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { H1 } from '../components/h1';

interface PacientesEnTratamientoProps {
  title: string;
  description: any;
  info: EntryAdvice[];
}

const PacientesEnTratamiento = (props: PacientesEnTratamientoProps) => {
  return (
    <CenteredContent>
      <Stack spacing={8} alignItems="center">
        <H1>{props.title}</H1>

        <Text>{documentToReactComponents(props.description)}</Text>

        <Grid templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} gap={6}>
          {props.info.map((advice: EntryAdvice, i) => {
            if (!advice.fields) {
              return null;
            }

            return (
              <Card>
                <Stack spacing={5}>
                  <Box>
                    <Card.Title>{advice.fields.title}</Card.Title>
                  </Box>
                  <Box>
                    <Stack spacing={3}>
                      {documentToReactComponents(advice.fields.content)}
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            );
          })}
        </Grid>
      </Stack>
    </CenteredContent>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { client } = require('../contentful/client');

  const entry = await client.getEntry('5FH3GSnsNaskgqY2vmRVnb');

  return {
    props: {
      ...entry.fields,
    },
  };
}

export default PacientesEnTratamiento;
