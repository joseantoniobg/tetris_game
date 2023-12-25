

function getNextPiece() {
  nextPieceElement
}

function getNewPiece() {
  return new TetraPiece(board, nextPiece.newPiece.map(p => ({ x: p.x + initialPosition, y: p.y })), nextPiece.color, nextPiece.angle);
}

function addNewPiece() {
  if (!nextPiece) {
    nextPiece = getRandomNewPiece();
  }
  board.tetraPieces.push(getNewPiece());
  nextPiece = getRandomNewPiece();
  console.log(board.tetraPieces);
}

function draw() {
  board.tetraPieces.map(piece => piece.squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin))));
  nextPiece.newPiece.map(square => nextPieceElement.append(new Square(nextPiece.color, square.x, square.y).createSquare(pieceSize, pieceMargin)));
  const nextPieceHeight = totalPiecelength * nextPiece.newPiece.reduce((a, b) => b.y + 1 > a ? b.y + 1 : a, 0);
  const nextPieceWidth = totalPiecelength * nextPiece.newPiece.reduce((a, b) => b.x + 1 > a ? b.x + 1 : a, 0);
  nextPieceElement.style.height = `${nextPieceHeight}px`;
  nextPieceElement.style.width = `${nextPieceWidth}px`;
}

// for (let x = 0; x < piecesXSize; x++) {
//   for (let y = 0; y < piecesYSize; y++) {
//     const piece = new Piece('red', x, y);
//     pieces.push(piece);
//     board.appendChild(piece.createPiece(pieceSize, pieceMargin));
//   }
// }

function resetBoard() {
  boardElement.innerHTML = '';
  nextPieceElement.innerHTML = '';
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
    resetBoard();
    draw();
    moveDown();
    if (!board.tetraPieces[board.tetraPieces.length - 1].moving) {
      addNewPiece();
    }
  }, gameSpeedDelay);
}

addNewPiece();
redrawScreen();