class TetraPiece {
  constructor(piece, color, currentAngle, pieceModel, totalPositions, shadow = false) {
    this.squares = [];
    piece.forEach(square => {
      this.squares.push(new Square(color, square.x, square.y));
    });
    this.color = color;
    this.pieceModel = pieceModel;
    this.currentAngle = currentAngle;
    this.index = board.tetraPieces.length;
    this.moving = true;
    this.totalPositions = totalPositions;
    this.shadow = shadow;
  }

  static getRandomNewPiece() {
    const pieceModel = Math.floor(Math.random() * tetrisPieces.length);
    const angle = Math.floor(Math.random() * tetrisPieces[pieceModel].length);
    return new TetraPiece(tetrisPieces[pieceModel][angle].map(p => ({ x: p.x + initialPosition, y: p.y })), getRandomColor(), angle, pieceModel, tetrisPieces[pieceModel].length);
  }

  eliminateSquares(x) {
    this.squares = this.squares.filter(p => p.y !== x);
  }

  reposition(x) {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].y += this.squares[i].y < x ? 1 : 0;
    }
  }

  #setUsedPositions() {
    this.squares.forEach(p => {
      usedXSpaces[p.y] += 1;
      usedPositions.push({ x: p.x, y: p.y });
    });
  }

  #stopPiece() {
    this.moving = false;

    if (this.shadow) {
      return true;
    }

    for (const square of this.squares) {
      square.y = Math.floor(square.y);
      square.x = Math.floor(square.x);
    }
    this.#setUsedPositions();
    return true;
  }

  checkMoving(tetraPieces) {
    if (this.squares.find(p => p.y + 1 >= piecesYSize)) {
      return this.#stopPiece();
    }

    for (const tetraPiece of tetraPieces.slice(0, tetraPieces.length - 1)) {
      for (const square of tetraPiece.squares) {
        if (this.squares.find(p => p.x === square.x && square.y === p.y + 1)) {
          return this.#stopPiece();
        }
      }
    }
  }

  #stopMoving(direction) {
    if (!this.moving) {
      return true;
    }

    const { tetraPieces, piecesXSize, piecesYSize } = board;

    switch (direction) {
      case 'down':
        return this.checkMoving(tetraPieces);

      case 'left':
        if (this.squares.find(p => p.x - 1 < 0)) {
          return true;
        }

        for (const tetraPiece of tetraPieces.slice(0, tetraPieces.length - 1)) {
          for (const square of tetraPiece.squares) {
            if (this.squares.find(p => Math.ceil(p.x) === square.x + 1 && square.y === Math.ceil(p.y))) {
              return true;
            }
          }
        }
        break;

      case 'right':
        if (this.squares.find(p => p.x + 1 >= piecesXSize)) {
          return true;
        }

        for (const tetraPiece of tetraPieces.slice(0, tetraPieces.length - 1)) {
          for (const square of tetraPiece.squares) {
            if (this.squares.find(p => Math.ceil(p.x) === square.x - 1 && square.y === Math.ceil(p.y))) {
              return true;
            }
          }
        }
        break;
    }
  }

  move(direction) {
    if (!this.#stopMoving(direction)) {
      this.squares.forEach(piece => piece.move(direction));
    }
  }

  #checkRotation(squares) {
    if (usedPositions.find(p => squares.find(s => (Math.ceil(s.x) === p.x && Math.ceil(s.y) === p.y) || (Math.floor(s.x) === p.x && Math.floor(s.y) === p.y)))) {
      return true;
    }
  }

  #getMininumX() {
    return this.squares.reduce((a, b) => b.x < a ? b.x : a, this.squares[0].x);
  }

  #getMininumY() {
    return this.squares.reduce((a, b) => b.y < a ? b.y : a, this.squares[0].y);
  }

  getShadowPiece() {
    const shadowPiece = new TetraPiece(this.squares, this.color, this.currentAngle, this.pieceModel, this.totalPositions, true);
    while (shadowPiece.moving) {
      shadowPiece.move('down');
    }

    if (shadowPiece.#getMininumY() - this.#getMininumY() < 10) {
      return null;
    }

    return shadowPiece;
  }

  rotate() {
    this.currentAngle = this.currentAngle === this.totalPositions - 1 ? 0 : this.currentAngle + 1;
    const currentX = this.#getMininumX();
    const currentY = this.squares[0].y;
    const squares = [];
    tetrisPieces[this.pieceModel][this.currentAngle].forEach((square) => {
      squares.push(new Square(this.color, square.x + currentX, square.y + currentY));
    });

    if (this.#checkRotation(squares)) {
      return false;
    }

    this.squares = squares;

    while (this.squares.find(p => p.x >= piecesXSize)) {
      this.move('left');
    }

    return true;
  }
}