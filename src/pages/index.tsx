import { NextPageContext } from 'next';
import { Grid, Stack, Box } from '@chakra-ui/core';

import { EntryAdvice } from '../types';
import { Card } from '../components/card';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroWithImage } from '../components/hero';
import { Metatags } from '../components/metatags';
import DoctorImage from '../assets/svg/doctor-woman.svg';

interface HomeProps {
  title: string;
  info: EntryAdvice[];
}

const Home = (props: HomeProps) => {
  return (
    <>
      <Metatags
        title="Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />

      <Stack spacing={5}>
        <HeroWithImage title={props.title}>
          <Box paddingTop={10}>
            <DoctorImage
              style={{
                height: '400px',
              }}
            />
          </Box>
        </HeroWithImage>

        <CenteredContent>
          <Stack spacing={8} alignItems="center">
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
      </Stack>
    </>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { client } = require('../contentful/client');

  // const entries = await client.getEntries({
  //   content_type: 'home',
  // });
  const entry = await client.getEntry('hXBelglMzWYcbpwYBEhiW');

  return {
    props: {
      ...entry.fields,
    },
  };
}

export default Home;
