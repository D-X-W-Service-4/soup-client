export const SOUP = [
  'TOMATO',
  'CORN',
  'MUSHROOM',
  'PUMPKIN',
  'SWEET_POTATO',
] as const;
export type SoupLevel = (typeof SOUP)[number];
