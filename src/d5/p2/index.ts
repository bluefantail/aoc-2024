import { printQueueInput } from "../input"

export const d5p2 = (): string => {
  const printQueue: string = printQueueInput;

  const pageOrderRules: number[][] = printQueue
  .split("\n\n")[0]
  .split("\n")
  .map((s) => s.split("|").map(Number));

  const pageUpdates: number[][] = printQueue
    .split("\n\n")[1]
    .split("\n")
    .map((s) => s.split(",").map(Number));

  const incorrectlyOrderedpages: number[][] = pageUpdates.filter(
    (pageList: number[]) => {
      if (
        !pageList.every((n) =>
          pageOrderRules
            .filter((r) => r.includes(n))
            .every((r) => {
              if (
                (r[0] === n && !pageList.includes(r[1])) ||
                (r[1] === n && !pageList.includes(r[0])) ||
                (r[0] === n &&
                  pageList.includes(r[1]) &&
                  pageList.indexOf(r[1]) > pageList.indexOf(r[0])) ||
                (r[1] === n &&
                  pageList.includes(r[0]) &&
                  pageList.indexOf(r[0]) < pageList.indexOf(r[1]))
              ) {
                return true;
              }
            })
        )
      ) {
        return true;
      }
    }
  );

  const correctlyOrderedpages: number[][] = incorrectlyOrderedpages.map(
    (pageList: number[]) => {
      pageList.forEach((_n: number) =>
        pageOrderRules.forEach((r: number[]) => {
          if (
            pageList.includes(r[1]) &&
            pageList.indexOf(r[1]) < pageList.indexOf(r[0])
          ) {
            const left: number = pageList[pageList.indexOf(r[1])];
            const right: number = pageList[pageList.indexOf(r[0])];

            pageList[pageList.indexOf(r[0])] = left;
            pageList[pageList.indexOf(r[1])] = right;
          } else if (
            pageList.includes(r[0]) &&
            pageList.indexOf(r[0]) < pageList.indexOf(r[1])
          ) {
            const left: number = pageList[pageList.indexOf(r[1])];
            const right: number = pageList[pageList.indexOf(r[0])];

            pageList[pageList.indexOf(r[0])] = left;
            pageList[pageList.indexOf(r[1])] = right;
          }
        })
      );

      return pageList;
    }
  );

  const middlePages: number[] = correctlyOrderedpages
    .flatMap((p: number[]) =>
      p.filter((_n: number, i: number) => i === (p.length - 1) / 2)
    );

  const answer: number = middlePages.reduce((a: number, b: number) => a + b);
  return `Middle page total: ${answer}`;
}
