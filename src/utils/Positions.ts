import { Position } from "../constants/Question";

const positionMap = new Map<number, Position>([
  [1, "Back-end"],
  [2, "Front-end"],
  [3, "Full-Stack"],
  [4, "Designer"],
]);

export function getPositionKeyById(id: number): Position | undefined {
  return positionMap.get(id);
}

export const positionKeyToId = {
  backend: 1,
  frontend: 2,
  fullstack: 3,
  designer: 4,
} as const;

export function getPositionIdByKey(key: string): number {
  return positionKeyToId[key as keyof typeof positionKeyToId];
}
