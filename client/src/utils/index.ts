const onBoard = (row: number, col: number) =>
  row >= 0 && row < 8 && col >= 0 && col < 8;

export { onBoard };
