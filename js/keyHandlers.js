function handleKeyPress(event) {
  if (event.code === 'Space' || event.key === ' ') {
    if (!gameStarted) {
      startGame();
      return;
    }
    rotatePiece();
    return;
  }

  switch (event.key) {
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'z':
      moveAllTheWay();
      break;
  }
}

document.addEventListener('keydown', handleKeyPress);