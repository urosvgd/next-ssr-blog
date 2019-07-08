import { Block, Inline } from '@contentful/rich-text-types';

export function getEmbeddedContentType(node: Block | Inline): string {
  const {
    data: {
      target: {
        sys: {
          contentType: {
            sys: { id },
          },
        },
      },
    },
  } = node;

  return id;
}

export function getEmbeddedFields<T>(node: Block | Inline): T {
  return node.data.target.fields;
}
