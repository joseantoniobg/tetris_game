function getRandomNewPiece() {
  const angle = Math.floor(Math.random() * tetrisPieces.length);
  const pieceModel = Math.floor(Math.random() * tetrisPieces.length);
  return { newPiece: tetrisPieces[pieceModel][angle], angle, color: getRandomColor(), pieceModel };
}

function increaseSpeed() {
  gameSpeedDelay = gameSpeedDelay - 10;
}

function getNewPiece() {
  currentPieceIndex = board.tetraPieces.length;
  return new TetraPiece(board, nextPiece.newPiece.map(p => ({ x: p.x + initialPosition, y: p.y })), nextPiece.color, nextPiece.angle, nextPiece.pieceModel);
}

function addNewPiece() {
  if (!nextPiece) {
    nextPiece = getRandomNewPiece();
  }
  board.tetraPieces.push(getNewPiece());
  nextPiece = getRandomNewPiece();
}

function rotatePiece() {
  board.tetraPieces[currentPieceIndex].rotate();
}

function drawBoard(newPice = false) {
  if (!newPice) {
    //const parent = document.querySelector("#board");
    [...boardElement.children].slice(-4).forEach(boardElement.removeChild.bind(boardElement));
  }
  board.tetraPieces[currentPieceIndex].squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin)));

  //board.tetraPieces.map(piece => piece.squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin))));
}

function drawNextPiece() {
  nextPieceElement.innerHTML = '';
  nextPiece.newPiece.map(square => nextPieceElement.append(new Square(nextPiece.color, square.x, square.y).createSquare(pieceSize, pieceMargin)));
  const nextPieceHeight = totalPiecelength * nextPiece.newPiece.reduce((a, b) => b.y + 1 > a ? b.y + 1 : a, 0);
  const nextPieceWidth = totalPiecelength * nextPiece.newPiece.reduce((a, b) => b.x + 1 > a ? b.x + 1 : a, 0);
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

function redrawScreen() {
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    drawBoard();
    moveDown();
    if (!board.tetraPieces[currentPieceIndex].moving) {
      increaseSpeed();
      addNewPiece();
      drawBoard(true);
      drawNextPiece();
    }
  }, gameSpeedDelay);
}

resetBoard();
addNewPiece();
drawNextPiece();
redrawScreen();