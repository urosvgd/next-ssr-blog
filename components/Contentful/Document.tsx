import React from 'react';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { Document as DocumentType, BLOCKS } from '@contentful/rich-text-types';
import { ProfileCard } from '../ProfileCard';
import { Employee } from '../../models';
import {
  getEmbeddedContentType,
  getEmbeddedFields,
} from '../../helpers/contentHelpers';

interface DocumentProps {
  content: DocumentType;
}

const documentOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      if (getEmbeddedContentType(node) === 'employee') {
        const data = getEmbeddedFields<Employee>(node);
        return <ProfileCard {...data} />;
      }

      return null;
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <img
          src={node.data.target.fields.file.url}
          style={{ maxWidth: '100%' }}
        />
      );
    },
  },
  renderText: text => {
    return text.split('\n').reduce(
      (children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      },
      [] as React.ReactNode[]
    );
  },
};

export const Document: React.FC<DocumentProps> = ({ content }) => {
  return <>{documentToReactComponents(content, documentOptions)}</>;
};
