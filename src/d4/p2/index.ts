import { wordSearchInput } from "../input";

export const d4p2 = (): string => {
  type LetterAndPosition = string | [number, number];
  type RowOfLetters = LetterAndPosition[];
  type LetterGrid = RowOfLetters[];

  const rowLength: number = wordSearchInput.split(/\s/)[0].length;

  const rows: LetterGrid[] = wordSearchInput
    .split(/\s/m)
    .map((s: string, r: number) =>
      s.split("").map((l: string, c: number) => [l, [r, c]])
    );

  let diagX: LetterGrid[] = [];
  let diagY: LetterGrid[] = [];

  function buildDiagonals(array: LetterGrid[]): LetterGrid[] {
    const lines: LetterGrid[] = [];

    let row = 0;
    let col = 0;
    let diagonalLength = 0;

    while (col < rowLength) {
      let currentLength: number = diagonalLength;

      const line: RowOfLetters[] = [];

      while (currentLength + 1 > 0) {
        line.push(array[row][currentLength]);

        row++;
        currentLength--;
      }

      row = 0;

      lines.push(line);

      col++;
      if (diagonalLength < rowLength) diagonalLength++;
    }

    row++;

    while (row < rows.length - rowLength) {
      let currentLength: number = rowLength - 1;
      let currentRow: number = row;

      const line: RowOfLetters[] = [];

      while (currentLength + 1 > 0) {
        line.push(array[currentRow][currentLength]);

        currentRow++;
        currentLength--;
      }

      row++;

      lines.push(line);
    }

    diagonalLength--;

    while (row < rows.length) {
      let currentLength: number = diagonalLength;
      let currentRow: number = row;
      let currentCol: number = rowLength - 1;

      const line: RowOfLetters[] = [];

      while (currentLength > 0) {
        line.push(array[currentRow][currentCol]);

        currentRow++;
        currentCol--;
        currentLength--;
      }

      lines.push(line);

      row++;
      diagonalLength--;
    }

    return lines;
  }

  function setDiagX() {
    diagX = buildDiagonals(rows);
  }

  function setDiagY() {
    const invertedRows: LetterGrid[] = rows.map((s) => s.reverse());
    diagY = buildDiagonals(invertedRows);
  }

  buildDiagonals(rows);
  setDiagX();
  setDiagY();

  function findPositions(array: LetterGrid[]): LetterAndPosition[] {
    const positions: RowOfLetters[] = array
      .flatMap((r: RowOfLetters[], i: number) =>
        r.filter((l: LetterAndPosition[], c: number) => {
          if (l[0] === "A" && array[i][c + 1] && array[i][c - 1]) {
            if (
              (array[i][c + 1][0] === "S" && array[i][c - 1][0] === "M") ||
              (array[i][c + 1][0] === "M" && array[i][c - 1][0] === "S")
            ) {
              return l;
            }
          }
        })
      );

    return positions.map((l) => l[1]);
  }

  function findXmarks(a: LetterAndPosition[], b: LetterAndPosition[]): number {
    return a.filter((p) => b.includes(p)).length;
  }

  const answer: number = findXmarks(findPositions(diagX), findPositions(diagY));

  return `X-MAS count: ${answer}`;

}
