import { GetStaticProps } from 'next';
import { Grid, Stack, Box, Text } from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';

import {
  EntryAdvice,
  PageWithGlobalProps,
  BasePage,
  EntryPrecaution,
} from '../types';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroWithImage } from '../components/hero';
import { Metatags } from '../components/metatags';
import { contentfulEntries } from '../contentful/entries';
import DoctorImage from '../assets/svg/doctor-woman.svg';
import { getGlobalProps } from '../utils/global-props';
import { Advice } from '../components/advice';
import { Precautions } from '../components/precautions';
import { H2 } from '../components/h2';

type HomeProps = BasePage<{
  title: string;
  info: EntryAdvice[];
  disclaimer: Document;
  precautionsTitle: string;
  precautions: EntryPrecaution[];
}>;

const Home: PageWithGlobalProps<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <Metatags {...props.pageContent.metatags.fields} />

      <Stack spacing={5} backgroundColor="#f7f7f8" pb={10}>
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
          <Stack spacing={8}>
            <H2>{props.pageContent.precautionsTitle}</H2>
            <Precautions items={props.pageContent.precautions} />
          </Stack>
        </CenteredContent>

        <CenteredContent>
          <Stack spacing={8} alignItems="center">
            <Grid templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} gap={6}>
              {props.pageContent.info.map((advice: EntryAdvice, i) => {
                if (!advice.fields) {
                  return null;
                }

                return <Advice {...advice.fields} />;
              })}
            </Grid>

            <Text fontSize="sm">
              {documentToReactComponents(props.pageContent.disclaimer)}
            </Text>
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
  const entry = await client.getEntry(contentfulEntries.home, {
    include: 2,
  });

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
