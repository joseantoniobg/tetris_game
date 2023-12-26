function increaseSpeed() {
  gameSpeedDelay = gameSpeedDelay - 10;
}

function addNewPiece() {
  if (!nextPiece) {
    nextPiece = TetraPiece.getRandomNewPiece();
  }
  currentPieceIndex = board.tetraPieces.length;
  board.tetraPieces.push(nextPiece);
  nextPiece = TetraPiece.getRandomNewPiece();
}

function rotatePiece() {
  board.tetraPieces[currentPieceIndex].rotate();
}

function drawBoard(newPice = false) {
  if (!newPice) {
    [...boardElement.children].slice(-4).forEach(boardElement.removeChild.bind(boardElement));
  }
  board.tetraPieces[currentPieceIndex].squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin)));
}

function drawNextPiece() {
  nextPieceElement.innerHTML = '';
  nextPiece.squares.map(square => nextPieceElement.append(square.createSquare(pieceSize, pieceMargin)));
  const nextPieceHeight = totalPiecelength * nextPiece.squares.reduce((a, b) => b.y + 1 > a ? b.y + 1 : a, 0);
  const nextPieceWidth = totalPiecelength * (nextPiece.squares.reduce((a, b) => b.x + 1 > a ? b.x + 1 : a, 0) + initialPosition - 1);
  nextPieceElement.style.height = `${nextPieceHeight}px`;
  nextPieceElement.style.width = `${nextPieceWidth}px`;
}

function resetBoard() {
  boardElement.innerHTML = '';
}

function moveDown() {
  board.tetraPieces.forEach(piece => piece.move('down'));
}

function moveLeft() {
  board.tetraPieces.forEach(piece => piece.move('left'));
}

function moveRight() {
  board.tetraPieces.forEach(piece => piece.move('right'));
}

function checkFullLines() {
  const fullLines = [];
  for (let i = 0; i < piecesYSize; i++) {

  }
  return fullLines;
}

function redrawScreen() {
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    if(gameStarted) {
      if (!nextPiece) {
        resetBoard();
        addNewPiece();
        drawNextPiece();
      }
      drawBoard();
      moveDown();
      if (!board.tetraPieces[currentPieceIndex].moving) {
        increaseSpeed();
        addNewPiece();
        drawBoard(true);
        drawNextPiece();
      }
    }
  }, gameSpeedDelay);
}

function startGame() {
  gameStarted = true;
  score = 0;
  startGameElement.style.display = 'none';
  redrawScreen();
}