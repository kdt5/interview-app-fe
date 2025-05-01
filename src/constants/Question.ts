export const Positions = [
  "Back-end",
  "Front-end",
  "Full-Stack",
  "Designer",
] as const;
export type Position = (typeof Positions)[number];
export const ALL_CATEGORIES = -1;
