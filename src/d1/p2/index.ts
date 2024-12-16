import { locationsInput } from "../input.ts";

export const d1p2 = (): string => {
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

  const locationListSimilarities: number[] = locationsA.map(
    (currentA: number) => {
      return currentA * locationsB.filter((l: number) => l === currentA).length;
    }
  );

  const similarityScore: number = locationListSimilarities.reduce(
    (a, c) => a + c
  );

  return `Similarity score: ${similarityScore.toString()}`;
}
