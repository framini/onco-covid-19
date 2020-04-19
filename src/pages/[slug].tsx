import { GetStaticProps, GetStaticPaths } from 'next';
import { Stack } from '@chakra-ui/core';

import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroSection } from '../components/hero';
import { Metatags } from '../components/metatags';
import { contentfulEntries } from '../contentful/entries';
import { PageWithGlobalProps, BasePage, GenericEntryPage } from '../types';
import { getGlobalProps } from '../utils/global-props';
import { Entry } from 'contentful';

type GenericPageProps = BasePage<GenericEntryPage>;

const GenericPage: PageWithGlobalProps<GenericPageProps> = (
  props: GenericPageProps,
) => {
  return (
    <>
      <Metatags
        title="Recomendaciones de Psico-Oncología - Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />
      <Stack spacing={8} alignItems="center" pb={10}>
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
GenericPage.getGlobalProps = getGlobalProps;

export const getStaticPaths: GetStaticPaths = async () => {
  const { client } = require('../contentful/client');

  const entries = await client.getEntries({
    content_type: 'genericPage',
  });

  const pathsParams = entries.items.map((item: Entry<GenericEntryPage>) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths: pathsParams,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GenericPageProps> = async (
  context,
) => {
  const { client } = require('../contentful/client');
  const { params } = context;

  const globalInfo = await client.getEntry(contentfulEntries.globalInfo);
  const entries = await client.getEntries({
    content_type: 'genericPage',
    'fields.slug[in]': params!.slug,
  });

  return {
    props: {
      globalInfo: {
        ...globalInfo.fields,
      },
      pageContent: {
        ...entries.items[0].fields,
      },
    },
  };
};

export default GenericPage;
