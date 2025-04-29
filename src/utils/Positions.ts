import { Position } from "../constants/Question";

const positionMap = new Map<number, Position>([
  [1, "backend"],
  [2, "frontend"],
  [3, "fullStack"],
  [4, "designer"],
]);

export function getPositionKeyById(id: number): Position | undefined {
  return positionMap.get(id);
}

export const positionKeyToId = {
  backend: 1,
  frontend: 2,
  fullStack: 3,
  designer: 4,
} as const;

export function getPositionIdByKey(key?: string): number | undefined {
  return key ? positionKeyToId[key as keyof typeof positionKeyToId] : undefined;
}
