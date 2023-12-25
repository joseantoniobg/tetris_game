const boardWidth = 612;
const boardHeight = 884;
const pieceSize = 30;
const pieceMargin = 2;

const totalPiecelength = pieceSize + pieceMargin * 2;

const piecesXSize = boardWidth / totalPiecelength;
const piecesYSize = boardHeight / totalPiecelength;
const initialPosition = Math.floor(piecesXSize / 2);

console.log(totalPiecelength, piecesXSize, piecesYSize, initialPosition);

const boardElement = document.getElementById('board');
const nextPieceElement = document.getElementById('nextPieceContainer');

const board = {
  piecesXSize,
  piecesYSize,
  tetraPieces: [],
}

let angle = 0;

let nextPiece;

let gameInterval;
let gameSpeedDelay = 50;

let gameStarted = false;