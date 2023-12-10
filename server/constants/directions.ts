// These are the row and col offsets from a position

const LSHAPE: [number, number][] = [
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
];

const DIAGONAL: [number, number][] = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

// horizontal and vertical
const STRAIGHT: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// diagonal, horizontal, vertical
const STAR = [...DIAGONAL, ...STRAIGHT];

const DIRECTIONS: {
  [key: string]: [number, number][];
} = {
  LSHAPE,
  DIAGONAL,
  STRAIGHT,
  STAR,
};

export { DIRECTIONS };
