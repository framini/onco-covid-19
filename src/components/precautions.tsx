import React from 'react';
import { Box, Grid, BoxProps } from '@chakra-ui/core';

import { EntryPrecaution } from '../types';
import { StringSvg } from './string-svg';
import { documentToReactComponents } from '../utils/documentToReactComponents';

type PrecautionProps = {
  item: EntryPrecaution;
} & BoxProps;

const Precaution = (props: PrecautionProps) => {
  const { item, ...restProps } = props;

  return (
    <Box {...restProps}>
      <Grid templateColumns={'60px 1fr'} alignItems="center" gap={2}>
        <StringSvg content={props.item.fields.svgAsset} />
        <Box fontWeight="400">
          {documentToReactComponents(props.item.fields.content)}
        </Box>
      </Grid>
    </Box>
  );
};

interface PrecautionsProps {
  items: EntryPrecaution[];
}

export const Precautions = (props: PrecautionsProps) => {
  return (
    <Grid
      templateColumns={['1fr', '1fr 1fr']}
      alignItems={['flex-start', 'center']}
      gap={[4, 8]}
    >
      {props.items.map((p) => {
        return <Precaution item={p} />;
      })}
    </Grid>
  );
};
