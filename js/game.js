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

function drawCurrentPieceBoard(newPice = false) {
  if (!newPice && boardElement.children.length >= 4) {
    [...boardElement.children].slice(-4).forEach(boardElement.removeChild.bind(boardElement));
  }
  board.tetraPieces[currentPieceIndex].squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin)));
}

function drawFullBoard() {
  resetBoard();
  board.tetraPieces.forEach(piece => piece.squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin))));
}

function drawExclusionLine(line) {
  resetBoard();
  board.tetraPieces.forEach(piece => piece.squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin, square.y === line))));
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
  board.tetraPieces[currentPieceIndex].move('down');
}

function moveAllTheWay() {
  while (board.tetraPieces[currentPieceIndex].moving) {
    board.tetraPieces[currentPieceIndex].move('down');
  }
}

function moveLeft() {
  board.tetraPieces[currentPieceIndex].move('left');
}

function moveRight() {
  board.tetraPieces[currentPieceIndex].move('right');
}

function redrawScreen() {
  gameInterval = setInterval(async () => {
    if(gameStarted) {
      if (!nextPiece) {
        resetBoard();
        addNewPiece();
        drawNextPiece();
      }
      drawCurrentPieceBoard();
      moveDown();
      if (!board.tetraPieces[currentPieceIndex].moving) {
        verifyFullLine();
        increaseSpeed();
        addNewPiece();
        drawCurrentPieceBoard(true);
        drawNextPiece();
      }
    }
  }, gameSpeedDelay);
}

const delay = (ms) => {
  const startPoint = new Date().getTime()
  while (new Date().getTime() - startPoint <= ms) {/* wait */}
}

function animateLineExclusion(line) {
  for (let i = 0; i < 2; i++) {
    drawExclusionLine(line);
    delay(200);
    drawFullBoard();
    delay(200);
  }
}

function verifyFullLine() {
  let fullLine = usedXSpaces.findIndex(line => line === piecesXSize);
  while (fullLine >= 0) {
    score += 100;
    animateLineExclusion(fullLine);
    board.tetraPieces.forEach(piece => piece.eliminateSquares(fullLine));
    board.tetraPieces.filter(piece => piece.squares.length > 0);
    board.tetraPieces.forEach(piece => piece.reposition(fullLine));
    usedXSpaces.splice(fullLine, 1);
    usedXSpaces.unshift(0);
    drawFullBoard();
    fullLine = usedXSpaces.findIndex(line => line === piecesXSize);
  }
}

function startGame() {
  gameStarted = true;
  score = 0;
  startGameElement.style.display = 'none';
  redrawScreen();
}