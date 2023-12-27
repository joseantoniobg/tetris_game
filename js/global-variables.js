const boardWidth = 408;
const boardHeight = 884;
const pieceSize = 30;
const pieceMargin = 2;

const totalPiecelength = pieceSize + pieceMargin * 2;

const piecesXSize = boardWidth / totalPiecelength;
const piecesYSize = boardHeight / totalPiecelength;
const initialPosition = Math.floor(piecesXSize / 2);

const boardElement = document.getElementById('board');
const nextPieceElement = document.getElementById('nextPieceContainer');
const scoreElement = document.getElementById('score');

const board = {
  piecesXSize,
  piecesYSize,
  tetraPieces: [],
}

let angle = 0;

let nextPiece;

let gameInterval;
let gameSpeedDelay = 300;

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

const InvertedLPiece = [
  [{ x: 1, y: 0 },
   { x: 1, y: 1 },
   { x: 1, y: 2 },
   { x: 0, y: 2 },],
  [{ x: 0, y: 0 },
   { x: 0, y: 1 },
   { x: 1, y: 1 },
   { x: 2, y: 1 },],
  [{ x: 0, y: 0 },
   { x: 1, y: 0 },
   { x: 0, y: 1 },
   { x: 0, y: 2 },],
  [{ x: 0, y: 0 },
   { x: 1, y: 0 },
   { x: 2, y: 0 },
   { x: 2, y: 1 },],
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
];

const SquarePiece = [
  [{ x: 0, y: 0 },
   { x: 0, y: 1 },
   { x: 1, y: 0 },
   { x: 1, y: 1 },],
];

const TPiece = [
  [{ x: 1, y: 0 },
   { x: 0, y: 1 },
   { x: 1, y: 1 },
   { x: 2, y: 1 },],
   [{ x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 1 },],
  [{ x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },],
  [{ x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 1 },],
];

const BlockPiece = [
  [{ x: 0, y: 0 },
   { x: 1, y: 0 },
   { x: 1, y: 1 },
   { x: 2, y: 1 },],
   [{ x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },],
];

const BlockPieceInverted = [
  [{ x: 1, y: 0 },
   { x: 2, y: 0 },
   { x: 0, y: 1 },
   { x: 1, y: 1 },],
   [{ x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },],
];

const tetrisPieces = [LPiece, InvertedLPiece, IPiece, SquarePiece, BlockPiece, BlockPieceInverted, TPiece];

const pieceYmovement = 0.25;

let pointsTillEnd = 1000;
let score = 0;

let usedXSpaces;

let currentPiece;

let gameStarted = false;