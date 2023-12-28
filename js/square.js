class Square {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  createSquare(pieceSize, pieceMargin, exploding = false, translucid = false) {
    const element = document.createElement('div');
    element.className = 'square';
    element.style.left = `${this.x * (pieceMargin + pieceSize)}px`;
    element.style.top = `${this.y * (pieceMargin + pieceSize)}px`;
    element.style.background = exploding ? 'red' : this.color;
    element.classList.add(translucid ? 'translucid' : 'opaque');
    return element;
  }

  move(direction) {
    switch (direction) {
      case 'down':
        this.y = Math.floor((this.y + pieceYmovement) * 100) / 100;
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