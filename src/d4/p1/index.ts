import { wordSearchInput } from "../input";

export const d4p1 = (): string => {
  const rowLength: number = wordSearchInput.split(/\s/)[0].length;

  const rows: string[][] = wordSearchInput.split(/\s/m).map((s) => s.split(""));
  const columns: string[][] = rows[0].map((col, i) => rows.map((row) => row[i]));

  let diagX: string[][] = [];
  let diagY: string[][] = [];

  function buildDiagonals(array: string[][]): string[][] {
    const lines: string[][] = [];

    let row = 0;
    let col = 0;
    let diagonalLength = 0;

    while (col < rowLength) {
      let currentLength: number = diagonalLength;

      const line: string[] = [];

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

      const line: string[] = [];

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

      const line: string[] = [];

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
    const invertedRows: string[][] = rows.map((s) => s.reverse());
    diagY = buildDiagonals(invertedRows);
  }

  function findWords(array: string[][]): number {
    function countWord(regex: RegExp): number {
      const count: number = array
        .map((s) => s.join("").match(regex)?.length || 0)
        .reduce((a, b) => a + b);
      return count;
    }

    return countWord(/XMAS/gm) + countWord(/SAMX/gm);
  }

  buildDiagonals(rows);
  setDiagX();
  setDiagY();

  const answer: number =
    findWords(rows) + findWords(columns) + findWords(diagX) + findWords(diagY);

  return `XMAS count: ${answer}`
}
