import { EWebinarDescriptionFragment } from '@src/fromBackend/schema';

export const satisfyWebinarFilter = (
  item: EWebinarDescriptionFragment,
  searchTerm: string
): boolean => {
  return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  // item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
  // item.tickers.includes(searchTerm.toUpperCase())
};
