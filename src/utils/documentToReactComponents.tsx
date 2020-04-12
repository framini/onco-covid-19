import { documentToReactComponents as contentfulToReact } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, Node } from '@contentful/rich-text-types';
import { Text, List, ListItem, ListIcon, Link } from '@chakra-ui/core';

import {} from 'contentful';
import { getContentType } from './contentful';

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
            <ListIcon icon="arrow-forward" color="green.600" />
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
