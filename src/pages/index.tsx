import { GetStaticProps } from 'next';
import { Grid, Stack, Box } from '@chakra-ui/core';

import { EntryAdvice, PageWithGlobalProps, BasePage } from '../types';
import { Card } from '../components/card';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroWithImage } from '../components/hero';
import { Metatags } from '../components/metatags';
import { contentfulEntries } from '../contentful/entries';
import DoctorImage from '../assets/svg/doctor-woman.svg';
import { getGlobalProps } from '../utils/global-props';

type HomeProps = BasePage<{
  title: string;
  info: EntryAdvice[];
}>;

const Home: PageWithGlobalProps<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <Metatags
        title="Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />

      <Stack spacing={5} backgroundColor="#f7f7f8">
        <HeroWithImage title={props.pageContent.title}>
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
              {props.pageContent.info.map((advice: EntryAdvice, i) => {
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

// Workaround until _app supports getStaticProps
Home.getGlobalProps = getGlobalProps;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { client } = require('../contentful/client');

  const globalInfo = await client.getEntry(contentfulEntries.globalInfo);
  const entry = await client.getEntry(contentfulEntries.home);

  return {
    props: {
      globalInfo: {
        ...globalInfo.fields,
      },
      pageContent: {
        ...entry.fields,
      },
    },
  };
};

export default Home;
