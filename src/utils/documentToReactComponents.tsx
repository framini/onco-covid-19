import { documentToReactComponents as contentfulToReact } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Text, List, ListItem, ListIcon, Link } from '@chakra-ui/core';

import {} from 'contentful';
import { getContentType } from './contentful';
import { H1 } from '../components/h1';
import { H2 } from '../components/h2';
import { H3 } from '../components/h3';
import { EmbedYouTube } from '../components/embed-youtube';
import { ExternalLink } from '../components/external-link';

export const documentToReactComponents = (document: Document) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <Text>{children}</Text>;
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return <List spacing={2}>{children}</List>;
      },
      [BLOCKS.LIST_ITEM]: (node: any) => {
        const { content } = node;

        return (
          <ListItem>
            <ListIcon icon="arrow-forward" color="purple.500" />
            {contentfulToReact(content[0], {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (node: any, children) => {
                  return <>{children}</>;
                },
              },
            })}
          </ListItem>
        );
      },
      [BLOCKS.HEADING_1]: (node: any, children: any) => {
        return <H1 marginTop={4}>{children}</H1>;
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return <H2 marginTop={4}>{children}</H2>;
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return <H3 marginTop={4}>{children}</H3>;
      },
      // @ts-ignore
      [INLINES.HYPERLINK]: (node: any, children) => {
        if (node.data.uri.includes('youtube.com')) {
          return <EmbedYouTube uri={node.data.uri} />;
        }

        return <ExternalLink href={node.data.uri}>{children}</ExternalLink>;
      },
      'embedded-entry-inline': (node: any, children: any) => {
        const contentType = getContentType(node.data.target);

        if (contentType === 'Link') {
          const content = node.data?.target?.fields?.content;

          if (content) {
            const { query, ...restLink } = content;

            return <Link {...restLink}>{content.name}</Link>;
          } else {
            return null;
          }
        }

        return children;
      },
    },
  };

  return contentfulToReact(document, options);
};
