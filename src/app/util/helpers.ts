export function clone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val));
}

export function arrayFlatMap<T, U>(items: T[], mapper: (t: T) => U[]): U[] {
  return items.map(mapper).reduce((acc, i) => [...acc, ...i], []);
}
