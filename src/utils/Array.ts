export function moveToFront<T>(array: T[], index: number): T[] {
  if (array.length <= 1) {
    return array;
  }
  if (index < 0 || array.length <= index) {
    throw new Error("Invalid index: Index out of bounds");
  }

  const element = array.splice(index, 1)[0];
  array.unshift(element);

  return array;
}
