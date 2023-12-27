function increaseSpeed() {
  gameSpeedDelay -= 10;
}

function addNewPiece() {
  if (!nextPiece) {
    nextPiece = TetraPiece.getRandomNewPiece();
  }

  nextPiece.checkMoving(board.tetraPieces);

  if (!nextPiece.moving) {
    gameOver();
    return;
  }

  pointsTillEnd -= pointsTillEnd > 10 ? 10 : 0;
  currentPiece = nextPiece;
  board.tetraPieces.push(nextPiece);
  nextPiece = TetraPiece.getRandomNewPiece();
}

function rotatePiece() {
  currentPiece.rotate();
}

function drawCurrentPieceBoard(newPice = false) {
  if (!newPice && boardElement.children.length >= 4) {
    [...boardElement.children].slice(-4).forEach(boardElement.removeChild.bind(boardElement));
  }
  currentPiece?.squares?.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin)));
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
  if (!nextPiece) {
    return;
  }

  nextPieceElement.innerHTML = '';
  nextPiece.squares?.map(square => nextPieceElement.append(square.createSquare(pieceSize, pieceMargin)));
  const nextPieceHeight = totalPiecelength * nextPiece.squares.reduce((a, b) => b.y + 1 > a ? b.y + 1 : a, 0);
  const nextPieceWidth = totalPiecelength * (nextPiece.squares.reduce((a, b) => b.x + 1 > a ? b.x + 1 : a, 0) + initialPosition - 0.4);
  nextPieceElement.style.height = `${nextPieceHeight}px`;
  nextPieceElement.style.width = `${nextPieceWidth}px`;
}

function resetBoard() {
  boardElement.innerHTML = '';
}

function resetNextPiece() {
  nextPieceElement.innerHTML = '';
}

function moveDown() {
  currentPiece.move('down');
}

function moveAllTheWay() {
  while (currentPiece.moving) {
    currentPiece.move('down');
  }
}

function moveLeft() {
  currentPiece.move('left');
}

function moveRight() {
  currentPiece.move('right');
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
      if (!currentPiece.moving) {
        verifyFullLine();
        increaseSpeed();
        addNewPiece();
        drawCurrentPieceBoard(true);
        drawNextPiece();
      }
    }
  }, gameSpeedDelay);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateLineExclusion(line) {
  for (let i = 0; i < 2; i++) {
    await sleep(100);
    drawExclusionLine(line);
    await sleep(100);
    drawFullBoard();
  }
}

function updateScore() {
  scoreElement.innerHTML = String(score).padStart(5, '0');;
  pointsTillEnd = 1000;
}

async function verifyFullLine() {
  let fullLine = usedXSpaces.findIndex(line => line === piecesXSize);
  while (fullLine >= 0) {
    score += pointsTillEnd;
    updateScore();
    await animateLineExclusion(fullLine);
    board.tetraPieces.forEach(piece => piece.eliminateSquares(fullLine));
    board.tetraPieces.filter(piece => piece.squares.length > 0);
    board.tetraPieces.forEach(piece => piece.reposition(fullLine));
    usedXSpaces.splice(fullLine, 1);
    usedXSpaces.unshift(0);
    drawFullBoard();
    fullLine = usedXSpaces.findIndex(line => line === piecesXSize);
  }
}

function resetValues() {
  clearInterval(gameInterval);
  board.tetraPieces = [];
  usedXSpaces = Array(piecesYSize).fill(0);
  gameSpeedDelay = 300;
  currentPiece = undefined;
  nextPiece = undefined;
  resetBoard();
  resetNextPiece();
}

function resetScore() {
  score = 0;
  updateScore();
}

function gameOver() {
  resetValues();
  boardElement.innerHTML = `<div class="start-game absolute-center" id="startGame">Game over! Seu score foi de ${score} pontos. Pressione espaço para jogar novamente</div>`;
  resetScore();
  gameStarted = false;
}

function startGame() {
  resetValues();
  gameStarted = true;
  score = 0;
  redrawScreen();
}