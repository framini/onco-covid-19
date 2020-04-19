import { GetStaticProps } from 'next';
import { Stack } from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';

import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroSection } from '../components/hero';
import { Metatags } from '../components/metatags';
import { contentfulEntries } from '../contentful/entries';
import { PageWithGlobalProps, BasePage } from '../types';
import { getGlobalProps } from '../utils/global-props';

type RecomendacionesPsicoOncologiaProps = BasePage<{
  title: string;
  content: Document;
}>;

const RecomendacionesPsicoOncologia: PageWithGlobalProps<RecomendacionesPsicoOncologiaProps> = (
  props: RecomendacionesPsicoOncologiaProps,
) => {
  return (
    <>
      <Metatags
        title="Recomendaciones de Psico-Oncología - Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />
      <Stack spacing={8} alignItems="center">
        <HeroSection title={props.pageContent.title} />
        <CenteredContent maxW={800}>
          <Stack spacing={4}>
            {documentToReactComponents(props.pageContent.content)}
          </Stack>
        </CenteredContent>
      </Stack>
    </>
  );
};

// Workaround until _app supports getStaticProps
RecomendacionesPsicoOncologia.getGlobalProps = getGlobalProps;

export const getStaticProps: GetStaticProps<RecomendacionesPsicoOncologiaProps> = async () => {
  const { client } = require('../contentful/client');

  const globalInfo = await client.getEntry(contentfulEntries.globalInfo);
  const entry = await client.getEntry(
    contentfulEntries.recomendacionesPsicoOncologica,
  );

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

export default RecomendacionesPsicoOncologia;
