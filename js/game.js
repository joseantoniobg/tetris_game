function playSound(src) {
  new Audio(src).play();
}


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
  if (currentPiece.rotate()) {
    playSound(audioAssets.rotate);
  }
}

function drawShadowPiece() {
  if (!currentPiece) {
    return;
  }

  const shadowPiece = currentPiece.getShadowPiece();
  shadowPiece?.squares?.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin, false, true)));
}

function drawCurrentPieceBoard(newPiece = false) {
  if (!newPiece && boardElement.children.length >= 4) {
    const elementsToRemove = boardElement.getElementsByClassName('translucid').length > 0 ? currentPiece.squares.length * 2 : currentPiece.squares.length;
    [...boardElement.children].slice(-elementsToRemove).forEach(boardElement.removeChild.bind(boardElement));
  }
  currentPiece?.squares?.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin)));
  drawShadowPiece();
}

function drawFullBoard() {
  resetBoard();
  board.tetraPieces.forEach(piece => piece.squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin))));
  drawShadowPiece();
}

function drawExclusionLine(line) {
  resetBoard();
  board.tetraPieces.forEach(piece => piece.squares.forEach(square => boardElement.append(square.createSquare(pieceSize, pieceMargin, square.y === line))));
  drawShadowPiece();
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
  playSound(audioAssets.dropOff);
  while (currentPiece.moving) {
    currentPiece.move('down');
  }
}

function moveLeft() {
  playSound(audioAssets.move);
  currentPiece.move('left');
}

function moveRight() {
  playSound(audioAssets.move);
  currentPiece.move('right');
}

function playBonusSounds() {
  switch (piecesInARow) {
    case 2:
      playSound(audioAssets.double);
      break;
    case 3:
      playSound(audioAssets.triple);
      break;
    case 4:
      playSound(audioAssets.quadra);
      setTimeout(() => {
        playSound(audioAssets.victory);
      }, 1500);
      break;
  }
  piecesInARow = 0;
}

function redrawScreen() {
  gameInterval = setInterval(async () => {
    if(!gameStarted) {
      return;
    }

    if (!nextPiece) {
      resetBoard();
      addNewPiece();
      drawNextPiece();
    }

    drawCurrentPieceBoard();
    moveDown();

    if (!currentPiece.moving) {
      playSound(audioAssets.landing);
      verifyFullLine();
      increaseSpeed();
      addNewPiece();
      drawCurrentPieceBoard(true);
      drawNextPiece();
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
  scoreElement.innerHTML = String(score).padStart(5, '0');
  pointsTillEnd = 1000;
}

function resetUsedPositions() {
  usedPositions = [];
  board.tetraPieces.slice(0, board.tetraPieces.length - 1).forEach(piece => piece.squares.forEach(square => usedPositions.push({ x: square.x, y: square.y })));
}

async function verifyFullLine() {
  let fullLine = usedXSpaces.findIndex(line => line === piecesXSize);

  while (fullLine !== -1) {
    piecesInARow += 1;
    score += pointsTillEnd * piecesInARow;
    updateScore();
    playSound(audioAssets.clearLine);
    await animateLineExclusion(fullLine);
    board.tetraPieces.forEach(piece => piece.eliminateSquares(fullLine));
    board.tetraPieces.filter(piece => piece.squares.length > 0);
    board.tetraPieces.forEach(piece => piece.reposition(fullLine));
    usedXSpaces.splice(fullLine, 1);
    usedXSpaces.unshift(0);
    resetUsedPositions();
    drawFullBoard();
    fullLine = usedXSpaces.findIndex(line => line === piecesXSize);
  }

  playBonusSounds();
}

function resetValues() {
  clearInterval(gameInterval);
  board.tetraPieces = [];
  usedXSpaces = Array(piecesYSize).fill(0);
  gameSpeedDelay = 300;
  currentPiece = undefined;
  nextPiece = undefined;
  usedPositions = [];
  resetBoard();
  resetNextPiece();
}

function resetScore() {
  score = 0;
  updateScore();
}

function gameOver() {
  audioElement.pause();
  resetValues();
  boardElement.innerHTML = `<div class="start-game absolute-center" id="startGame">Game over! Seu score foi de ${score} pontos. Pressione espaço para jogar novamente</div>`;
  resetScore();
  gameStarted = false;
  playSound(audioAssets.gameOver1);
  setTimeout(() => {
    playSound(audioAssets.gameOver2);
  }, 1500);
}

function startGame() {
  audioElement.currentTime = 0;
  audioElement.play();
  audioElement.loop = true;
  audioElement.volume = 0.3;
  resetValues();
  resetScore();
  gameStarted = true;
  redrawScreen();
}