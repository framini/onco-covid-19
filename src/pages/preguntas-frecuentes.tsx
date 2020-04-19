import { GetStaticProps } from 'next';
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

import {
  EntryAdvice,
  EntryFAQSection,
  PageWithGlobalProps,
  BasePage,
} from '../types';
import { CenteredContent } from '../components/centered-content';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { HeroSection } from '../components/hero';
import { Metatags } from '../components/metatags';
import { H3 } from '../components/h3';
import { contentfulEntries } from '../contentful/entries';
import { getGlobalProps } from '../utils/global-props';

type PreguntasFrecuentesProps = BasePage<{
  title: string;
  moreInfo: any;
  content: EntryFAQSection[];
}>;

const PreguntasFrecuentes: PageWithGlobalProps<PreguntasFrecuentesProps> = (
  props: PreguntasFrecuentesProps,
) => {
  const theme = useTheme();

  return (
    <>
      <Metatags
        title="Preguntas Frecuentes - Hospital Escuela Eva Perón"
        description="Preguntas de la situación actual, para pacientes que hacen quimioterapia, radioterapia y más."
      />
      <Stack spacing={8} alignItems="center" pb={10}>
        <HeroSection title={props.pageContent.title} marginBottom={0} />
        <CenteredContent maxW={800}>
          <Grid templateColumns={['1fr']} gap={8}>
            <Stack spacing={12}>
              {props.pageContent.content.map((section: EntryFAQSection) => {
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

// Workaround until _app supports getStaticProps
PreguntasFrecuentes.getGlobalProps = getGlobalProps;

export const getStaticProps: GetStaticProps<PreguntasFrecuentesProps> = async () => {
  const { client } = require('../contentful/client');

  const globalInfo = await client.getEntry(contentfulEntries.globalInfo);
  const entry = await client.getEntry(contentfulEntries.preguntasFrecuentes, {
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

export default PreguntasFrecuentes;
