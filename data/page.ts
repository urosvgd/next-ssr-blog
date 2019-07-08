import data from './data/page.json';
import { Page } from '../models';

export function getPages(): Page[] {
  return data as Page[];
}
export function getPage(slug: string): Page | undefined {
  return getPages().find(page => page.slug === slug);
}
