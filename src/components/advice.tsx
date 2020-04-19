import React from 'react';
import { Stack, Box } from '@chakra-ui/core';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';

import { Card } from './card';
import { documentToReactComponents } from '../utils/documentToReactComponents';
import { GenericEntryPage } from '../types';
import { getRouteProps } from '../utils/routes';
import { ButtonLink } from './button-link';

interface AdviceProps {
  title: string;
  content: Document;
  moreInfo: Entry<GenericEntryPage>;
}

export const Advice = ({ title, content, moreInfo }: AdviceProps) => {
  return (
    <Card>
      <Stack spacing={5}>
        <Box>
          <Card.Title>{title}</Card.Title>
        </Box>
        <Box>
          <Stack spacing={3}>{documentToReactComponents(content)}</Stack>
        </Box>
        {moreInfo && (
          <Box>
            <ButtonLink
              {...getRouteProps('generic-page', {
                slug: moreInfo.fields.slug,
              })}
            >
              Leer más
            </ButtonLink>
          </Box>
        )}
      </Stack>
    </Card>
  );
};
