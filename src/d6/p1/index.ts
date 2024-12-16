// import { mapInput } from "./input";

export const d6p1 = (): string => {
  const sampleMapInput: string = `....#.....
  .........#
  ..........
  ..#.......
  .......#..
  ..........
  .#..^.....
  ........#.
  #.........
  ......#...`;

  type coordinates = number[];
  type direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

  const labMap: string[][] = sampleMapInput
    .split("\n")
    .map((r: string) => r.split(""));

  const obstructionMap: boolean[][] = labMap.map((r: string[]) =>
    r.map((c: string) => {
      return c  === "#";
    })
  );

  const obstructionPositions: coordinates[] = obstructionMap
    .flatMap((r: boolean[], rn: number) =>
      r.map((c: boolean, cn: number) => (c ? [rn, cn] : false))
    )
    .filter((v: boolean | coordinates) => v) as coordinates[];

  let guardPosition: coordinates = labMap.flatMap((r: string[], rn: number) =>
    r
      .flatMap((c: string, cn: number) => {
        return c === "^" ? [rn, cn] : null;
      })
      .filter((v) => v)
  ) as coordinates;

  const currentDirection: direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];

  const visitedPositions: coordinates[] = [guardPosition];

  let moving = true;

  function move(currentPosition: coordinates, direction: direction) {
    const sr: number = currentPosition[0];
    const sc: number = currentPosition[1];

    let newPosition: coordinates;

    switch (direction) {
      case "NORTH":
        newPosition = [sr - 1, sc];
        break;
      case "EAST":
        newPosition = [sr, sc + 1];
        break;
      case "SOUTH":
        newPosition = [sr + 1, sc];
        break;
      case "WEST":
        newPosition = [sr, sc - 1];
        break;
    }

    const comparableObstructionPositions: string[] = obstructionPositions.map(
      (p) => p.toString()
    );

    const comparableNewPosition: string = newPosition.toString();

    if (comparableObstructionPositions.includes(comparableNewPosition)) {
      guardPosition = currentPosition;
      currentDirection.push(currentDirection.shift() as direction);
    } else if (
      newPosition[0] < 0 ||
      newPosition[0] > labMap.length - 1 ||
      newPosition[1] < 0 ||
      newPosition[1] > labMap[0].length - 1
    ) {
      moving = false;
    } else {
      guardPosition = newPosition;
      visitedPositions.push(newPosition);
    }
  }

  while (moving) {
    move(guardPosition, currentDirection[0]);
  }

  const uniqueVisitedPositionCount: number = visitedPositions
    .map((p: coordinates) => p.toString())
    .sort()
    .filter((s: string, i: number, a: string[]) => s !== a[i + 1]).length;

  const answer: number = uniqueVisitedPositionCount;

  return `Visited positions: ${answer}`
}