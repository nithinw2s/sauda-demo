
export function getRangePairs(min: number, max: number): [number, number][] {
  const result: [number, number][] = [];

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("Both min and max must be finite numbers.");
  }
  if (min > max) {
    throw new Error("min must be less than or equal to max.");
  }

  const step = 100;
  let start = Math.floor(min / step) * step;

  while (start < max) {
    const end = start + step;
    if (end > max) {
      result.push([start, max]);  // Cap the last range to `max`
      break;
    }

    result.push([start, end]);
    start += step * 2; // Skip one step (i.e., 100 units)
  }
  return result;
};
