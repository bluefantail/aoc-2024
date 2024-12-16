import { mapInput } from "./input";

onmessage = (e) => {
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

  type coordinates = [number, number];
  type position = [coordinates, direction]

  enum direction {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
  }

  // WARNING full input run is slowwwww... switch to mapInput, get some snacks, wait ~3 hours
  const labMap: string[][] = sampleMapInput
    .split("\n")
    .map((r: string) => r.trim().split(""));

  const mapHeight: number = labMap.length
  const mapWidth: number = labMap[0].length

  const obstructionMap: boolean[][] = labMap.map((r: string[]) =>
    r.map((c: string) => c === "#")
  );

  const obstructionCoordinates: coordinates[] = obstructionMap
    .flatMap((r: boolean[], rn: number) =>
      r.map((c: boolean, cn: number) => (c ? [rn, cn] : false) as boolean | coordinates)
    )
    .filter((v: boolean | coordinates) => v) as coordinates[];

  const initialGuardCoordinates: coordinates = labMap.flatMap(
    (r: string[], rn: number) =>
      r.flatMap((c: string, cn: number) => {
        return c === "^" ? [rn, cn] : null;
      })
      .filter((v) => v)
  ) as coordinates;

  const initialDirection: direction = direction.NORTH;

  let currentDirection: direction = initialDirection.valueOf();
  let guardPosition: position = [[...initialGuardCoordinates], initialDirection.valueOf()];
  let visitedPositions: position[] = [[...guardPosition]];

  let moving = true;
  let looping = false;

  function move(obstructions: coordinates[], currentPosition: position, loopCheck: boolean) {
    const sr: number = currentPosition[0][0];
    const sc: number = currentPosition[0][1];

    let newPosition: position;

    switch (currentDirection) {
      case direction.NORTH:
        newPosition = [[sr - 1, sc], direction.NORTH];
        break;
      case direction.EAST:
        newPosition = [[sr, sc + 1], direction.EAST];
        break;
      case direction.SOUTH:
        newPosition = [[sr + 1, sc], direction.SOUTH];
        break;
      case direction.WEST:
        newPosition = [[sr, sc - 1], direction.WEST];
        break;
    }

    const comparableVisitedPositions: string[] = visitedPositions.map((p: position) => p.toString());
    const comparableObstructionCoordinates: string[] = obstructions.map((o: coordinates) => o.toString());
    const comparableNewCoordinates: string = newPosition[0].toString();

    if (comparableObstructionCoordinates.includes(comparableNewCoordinates)) {
      if (
        loopCheck && comparableVisitedPositions.slice(0, -1).includes(currentPosition.toString())
      ) {
        looping = true;
        moving = false;
      } else {
        guardPosition = currentPosition;
        currentDirection = (currentDirection + 1) % 4;
      }
    } else if (
      newPosition[0][0] < 0 ||
      newPosition[0][0] > mapHeight - 1 ||
      newPosition[0][1] < 0 ||
      newPosition[0][1] > mapWidth - 1
    ) {
      moving = false;
    } else {
      guardPosition = newPosition;
      visitedPositions.push(newPosition);
    }
  }

  while (moving) {
    move(obstructionCoordinates, guardPosition, false);
  }

  const uniqueVisitedPositions: position[] = visitedPositions
    .map((p: position) => [p[0].toString(), p[1]])
    .sort()
    .filter((s: (string | direction)[], i: number, a: (string | direction)[][]) => {
      if (a[i + 1]) {
        return s[0] !== a[i + 1][0]
      }

      return s
    })
    .map((s: (string | direction)[]) => {
      const c: coordinates = (s[0] as string).split(",").map((e: string) => Number.parseInt(e)) as coordinates
      const p: position = [c, (s[1] as direction)]

      return p
    });

  function loopCheck(newCoordinates: coordinates): boolean {
    const newObstructionPositions = [...obstructionCoordinates, newCoordinates];

    guardPosition = [[...initialGuardCoordinates], initialDirection.valueOf()];
    currentDirection = direction.NORTH;

    visitedPositions = [[[...initialGuardCoordinates], initialDirection.valueOf()]];

    moving = true;
    looping = false;

    while (moving && !looping) {
      move(newObstructionPositions, guardPosition, true);
    }

    return !!looping
  }

  const loopingObstructionCoordinates: coordinates[] = [
    ...obstructionCoordinates,
    ...uniqueVisitedPositions.map((p: position) => p[0]),
  ].filter((p: coordinates, i: number, a: coordinates[]) => {
    if ((i + 1) % 10 === 0) console.log(`Attempt: ${i + 1} / ${a.length}`)

    return loopCheck(p);
  });

  const answer: number = loopingObstructionCoordinates.length;

  postMessage(answer);
};
