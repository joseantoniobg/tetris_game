class TetraPiece {
  constructor(board, piece, color, currentAngle, pieceModel, totalPositions) {
    this.squares = [];
    piece.forEach(square => {
      this.squares.push(new Square(color, square.x, square.y));
    });
    this.color = color;
    this.pieceModel = pieceModel;
    this.currentAngle = currentAngle;
    this.board = board;
    this.index = board.tetraPieces.length;
    this.moving = true;
    this.totalPositions = totalPositions;
  }

  static getRandomNewPiece() {
    const pieceModel = Math.floor(Math.random() * tetrisPieces.length);
    const angle = Math.floor(Math.random() * tetrisPieces[pieceModel].length);
    return new TetraPiece(board, tetrisPieces[pieceModel][angle].map(p => ({ x: p.x + initialPosition, y: p.y })), getRandomColor(), angle, pieceModel, tetrisPieces[pieceModel].length);
  }

  eliminateSquares(x) {
    this.squares = this.squares.filter(p => p.y !== x);
  }

  reposition(x) {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].y += this.squares[i].y < x ? 1 : 0;
    }
  }

  setUsedPositions() {
    this.squares.forEach(p => {
      usedXSpaces[p.y] += 1;
    });
  }

  stopMoving(direction) {
    const { tetraPieces, piecesXSize, piecesYSize } = this.board;

    if (!this.moving) {
      return true;
    }

    switch (direction) {
      case 'down':
      if (this.squares.find(p => p.y + 1 >= piecesYSize)) {
        this.setUsedPositions();
        this.moving = false;
        return true;
      }

      for (const tetraPiece of tetraPieces.slice(0, tetraPieces.length - 1)) {
        for (const square of tetraPiece.squares) {
          if (this.squares.find(p => p.x === square.x && square.y === p.y + 1)) {
            this.setUsedPositions();
            this.moving = false;
            return true;
          }
        }
      }
      break;

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
    if (!this.stopMoving(direction)) {
      this.squares.forEach(piece => piece.move(direction));
    }
  }

  rotate() {
    this.currentAngle = this.currentAngle === this.totalPositions - 1 ? 0 : this.currentAngle + 1;
    const currentX = this.squares.reduce((a, b) => b.x < a ? b.x : a, this.squares[0].x);
    const currentY = this.squares[0].y;
    this.squares = [];
    tetrisPieces[this.pieceModel][this.currentAngle].forEach((square) => {
      this.squares.push(new Square(this.color, square.x + currentX, square.y + currentY));
    });

    while (this.squares.find(p => p.x >= this.board.piecesXSize)) {
      this.move('left');
    }
  }
}