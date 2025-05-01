export const Positions = [
  "frontend",
  "backend",
  "fullStack",
  "designer",
] as const;
export type Position = (typeof Positions)[number];
export const ALL_CATEGORIES = -1;
