import { memoryInput } from "../input";

export const d3p1 = (): string => {
  const corruptedMemory: string = memoryInput;

  const decorruptionRegex: RegExp = /mul\(\d{1,3}\,\d{1,3}\)/gm;

  const mulInstructions: RegExpMatchArray | null =
  corruptedMemory.match(decorruptionRegex) || null;

  const multiples: number[][] = mulInstructions?.map((m) =>
    m.slice(4, -1).split(",").map(Number)
  ) as number[][];

  const answer: number = multiples
    .map((pair: number[]) => {
      return pair.reduce((a: number, b: number) => a * b);
    })
    .reduce((a: number, b: number) => a + b);

  return `
    Answer: ${answer}
  `;
}
