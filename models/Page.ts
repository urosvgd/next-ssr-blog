import { Document } from '@contentful/rich-text-types';

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  header: Document;
  body: Document;
}
