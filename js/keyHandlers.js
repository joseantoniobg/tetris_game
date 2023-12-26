function handleKeyPress(event) {
  if (event.code === 'Space' || event.key === ' ') {
    //if (!gameStarted) startGame();
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
  }
}

document.addEventListener('keydown', handleKeyPress);