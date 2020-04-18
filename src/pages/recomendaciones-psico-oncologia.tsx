import { NextPageContext } from 'next';
import { Grid, Stack, Box } from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';

import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroSection } from '../components/hero';
import { Metatags } from '../components/metatags';

interface RecomendacionesPsicoOncologiaProps {
  title: string;
  content: Document;
}

const RecomendacionesPsicoOncologia = (
  props: RecomendacionesPsicoOncologiaProps,
) => {
  return (
    <>
      <Metatags
        title="Recomendaciones de Psico-Oncología - Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />
      <Stack spacing={8} alignItems="center">
        <HeroSection title={props.title} />
        <CenteredContent maxW={800}>
          <Stack spacing={4}>{documentToReactComponents(props.content)}</Stack>
        </CenteredContent>
      </Stack>
    </>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { client } = require('../contentful/client');

  const entry = await client.getEntry('42CcWzbFVQA76LUZ7JpAUz');

  return {
    props: {
      ...entry.fields,
    },
  };
}

export default RecomendacionesPsicoOncologia;
