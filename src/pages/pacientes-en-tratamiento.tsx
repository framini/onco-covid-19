import { GetStaticProps } from 'next';
import { Grid, Stack, Box } from '@chakra-ui/core';

import { EntryAdvice, PageWithGlobalProps, BasePage } from '../types';
import { Card } from '../components/card';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroSection } from '../components/hero';
import { Metatags } from '../components/metatags';
import { contentfulEntries } from '../contentful/entries';
import { getGlobalProps } from '../utils/global-props';

type PacientesEnTratamientoProps = BasePage<{
  title: string;
  description: any;
  info: EntryAdvice[];
}>;

const PacientesEnTratamiento: PageWithGlobalProps<PacientesEnTratamientoProps> = (
  props: PacientesEnTratamientoProps,
) => {
  return (
    <>
      <Metatags
        title="Pacientes en Tratamiento - Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />
      <Stack spacing={8} alignItems="center" backgroundColor="#f7f7f8">
        <HeroSection
          title={props.pageContent.title}
          description={props.pageContent.description}
        />
        <CenteredContent>
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
        </CenteredContent>
      </Stack>
    </>
  );
};

// Workaround until _app supports getStaticProps
PacientesEnTratamiento.getGlobalProps = getGlobalProps;

export const getStaticProps: GetStaticProps<PacientesEnTratamientoProps> = async () => {
  const { client } = require('../contentful/client');

  const globalInfo = await client.getEntry(contentfulEntries.globalInfo);
  const entry = await client.getEntry(contentfulEntries.pacientesEnTratamiento);

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

export default PacientesEnTratamiento;
