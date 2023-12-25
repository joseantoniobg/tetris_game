class Square {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  createSquare(pieceSize, pieceMargin) {
    const element = document.createElement('div');
    element.className = 'square';
    element.style.left = `${this.x * (pieceMargin + pieceSize)}px`;
    element.style.top = `${this.y * (pieceMargin + pieceSize)}px`;
    element.style.background = this.color;
    return element;
  }

  move(direction) {
    switch (direction) {
      case 'down':
        this.y += 0.5;
        break;
      case 'left':
        this.x--;
        break;
      case 'right':
        this.x++;
        break;
    }
  }
}