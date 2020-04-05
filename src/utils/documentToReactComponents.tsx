import { documentToReactComponents as contentfulToReact } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, Node } from '@contentful/rich-text-types';
import { Text, List, ListItem, ListIcon } from '@chakra-ui/core';

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
    },
  };

  return contentfulToReact(document, options);
};
