const LPiece = [
  [{ x: 0, y: 0 },
   { x: 0, y: 1 },
   { x: 0, y: 2 },
   { x: 1, y: 2 },],
  [{ x: 0, y: 0 },
   { x: 1, y: 0 },
   { x: 2, y: 0 },
   { x: 0, y: 1 },],
  [{ x: 0, y: 0 },
   { x: 1, y: 0 },
   { x: 1, y: 1 },
   { x: 1, y: 2 },],
  [{ x: 0, y: 1 },
   { x: 1, y: 1 },
   { x: 2, y: 1 },
   { x: 2, y: 0 },],
];

const IPiece = [
  [{ x: 0, y: 0 },
   { x: 0, y: 1 },
   { x: 0, y: 2 },
   { x: 0, y: 3 },],
  [{ x: 0, y: 0 },
   { x: 1, y: 0 },
   { x: 2, y: 0 },
   { x: 3, y: 0 },],
  [{ x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },],
  [{ x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },],
];

const SquarePiece = [
  [{ x: 0, y: 0 },
   { x: 0, y: 1 },
   { x: 1, y: 0 },
   { x: 1, y: 1 },],
  [{ x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },],
  [{ x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },],
  [{ x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },],
];

const BlockPiece = [
  [{ x: 0, y: 0 },
   { x: 0, y: 1 },
   { x: 1, y: 1 },
   { x: 1, y: 2 },],
   [{ x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },],
  [{ x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },],
  [{ x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },],
];

const tetrisPieces = [LPiece, IPiece, SquarePiece, BlockPiece];

getRandomNewPiece = () => {
  const angle = Math.floor(Math.random() * 4);
  const pieceIndex = Math.floor(Math.random() * tetrisPieces.length);
  return { newPiece: tetrisPieces[pieceIndex][angle], angle, color: getRandomColor(), pieceIndex };
}