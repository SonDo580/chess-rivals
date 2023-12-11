const getBoardClass = (flip: boolean) => (flip ? `board flip` : "board");

const getSquareBgClass = (row: number, col: number) => {
  if (row % 2 === 0) {
    return col % 2 === 0 ? "light" : "bold";
  }
  return col % 2 === 0 ? "bold" : "light";
};

const getHighlightClass = (
  highlight: boolean,
  lastMove: boolean,
  checked: boolean
) => {
  const highlightClass = highlight ? "highlight" : "";
  const lastMoveClass = lastMove ? "last" : "";
  const checkedClass = checked ? "checked" : "";
  return checkedClass || highlightClass || lastMoveClass;
};

const getSquareClass = (
  row: number,
  col: number,
  highlight: boolean,
  lastMove: boolean,
  checked: boolean
) => {
  const bgClass = getSquareBgClass(row, col);
  const highlightClass = getHighlightClass(highlight, lastMove, checked);
  return `square ${bgClass} ${highlightClass}`;
};

export { getBoardClass, getSquareClass };
