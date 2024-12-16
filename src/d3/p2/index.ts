import { memoryInput } from "../input";

export const d3p2 = (): string => {
  const corruptedMemory: string = memoryInput;

  const stopInstructions: string[] = corruptedMemory.split("don't()");

  const startInstructions: string[] = stopInstructions
    .flatMap((subString: string, i: number) => {
      return i === 0
        ? subString
        : subString.split("do()").filter((s, i) => i !== 0);
    });

  const actionableMemory: string = startInstructions.join("");

  const decorruptionRegex: RegExp = /mul\(\d{1,3}\,\d{1,3}\)/gm;

  const mulInstructions: RegExpMatchArray | null =
    actionableMemory.match(decorruptionRegex) || null;

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
