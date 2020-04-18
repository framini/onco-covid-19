import { NextPageContext } from 'next';
import {
  Grid,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  useTheme,
} from '@chakra-ui/core';

import { EntryAdvice, FAQSection } from '../types';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroSection } from '../components/hero';
import { Metatags } from '../components/metatags';
import { H3 } from '../components/h3';

interface PreguntasFrecuentesProps {
  title: string;
  moreInfo: any;
  content: FAQSection[];
}

const PreguntasFrecuentes = (props: PreguntasFrecuentesProps) => {
  const theme = useTheme();

  return (
    <>
      <Metatags
        title="Preguntas Frecuentes - Hospital Escuela Eva Perón"
        description="Preguntas de la situación actual, para pacientes que hacen quimioterapia, radioterapia y más."
      />
      <Stack spacing={8} alignItems="center">
        <HeroSection title={props.title} marginBottom={0} />
        <CenteredContent maxW={800}>
          <Grid templateColumns={['1fr']} gap={8}>
            <Stack spacing={12}>
              {props.content.map((section: FAQSection) => {
                return (
                  <Stack spacing={4}>
                    <H3>{section.fields.title}</H3>
                    <Accordion allowToggle allowMultiple>
                      {section.fields.questions.map((advice: EntryAdvice) => {
                        if (!advice.fields) {
                          return null;
                        }

                        return (
                          <AccordionItem>
                            <AccordionHeader py={4} px={2}>
                              <Box flex="1" textAlign="left">
                                <strong>{advice.fields.title}</strong>
                              </Box>
                              <AccordionIcon />
                            </AccordionHeader>
                            <AccordionPanel
                              py={4}
                              px={2}
                              backgroundColor={theme.colors.gray[100]}
                              borderRadius={4}
                              position="relative"
                              top={1}
                            >
                              {documentToReactComponents(advice.fields.content)}
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </CenteredContent>
      </Stack>
    </>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { client } = require('../contentful/client');

  const entry = await client.getEntry('39MLiUiEfnXJqZwV0a3qL2', { include: 2 });

  return {
    props: {
      ...entry.fields,
    },
  };
}

export default PreguntasFrecuentes;
