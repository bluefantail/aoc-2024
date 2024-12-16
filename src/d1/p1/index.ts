import { locationsInput } from "../input.ts";

export const d1p1 = (): string => {
  const locationsList: string[] = locationsInput
    .split("   ")
    .join(",")
    .split("\n")
    .join(",")
    .split(",");

  const locationsA: number[] = locationsList
    .filter((_, i: number) => i % 2 === 0)
    .sort()
    .map(Number);

  const locationsB: number[] = locationsList
    .filter((_, i: number) => (i + 1) % 2 === 0)
    .sort()
    .map(Number);

  const locationDistances: number[] = locationsA.map((l, i) => {
    return Math.abs(l - locationsB[i]);
  });

  const totalDistance: number = locationDistances.reduce((a, c) => a + c);

  return `
    Total distance: ${totalDistance.toString()}
  `;
}
