const validRow = (row: number) => row >= 0 && row < 8;

const validCol = (col: number) => col >= 0 && col < 8;

const onBoard = (row: number, col: number) => validRow(row) && validCol(col);

export { onBoard, validRow, validCol };
