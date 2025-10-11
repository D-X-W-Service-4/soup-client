export const SOUP = [
  'TOMATO',
  'CORN',
  'MUSHROOM',
  'PUMPKIN',
  'SWEETPOTATO',
] as const;
export type SoupLevel = (typeof SOUP)[number];
