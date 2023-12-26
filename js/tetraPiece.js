class TetraPiece {
  constructor(board, piece, color, currentAngle, pieceModel) {
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
  }

  stopMoving(direction) {
    const { tetraPieces, piecesXSize, piecesYSize } = this.board;

    if (!this.moving) {
      return true;
    }

    switch (direction) {
      case 'down':
      if (this.squares.find(p => p.y + 1 >= piecesYSize)) {
        this.moving = false;
        return true;
      }

      for (const tetraPiece of this.board.tetraPieces.slice(0, this.board.tetraPieces.length - 1)) {
        for (const square of tetraPiece.squares) {
          if (this.squares.find(p => p.x === square.x && square.y === p.y + 1)) {
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

        for (const tetraPiece of this.board.tetraPieces.slice(0, this.board.tetraPieces.length - 1)) {
          for (const square of tetraPiece.squares) {
            if (this.squares.find(p => Math.ceil(p.x) === square.x + 1 && square.y === Math.ceil(p.y))) {
              return true;
            }
          }
        }
        break;

      case 'right':
        console.log(this.squares);
        if (this.squares.find(p => p.x + 1 >= piecesXSize)) {
          return true;
        }

        for (const tetraPiece of this.board.tetraPieces.slice(0, this.board.tetraPieces.length - 1)) {
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
    this.currentAngle = this.currentAngle === tetrisPieces.length - 1 ? 0 : this.currentAngle + 1;
    const currentX = this.squares[0].x;
    const currentY = this.squares[0].y;
    this.squares = [];
    tetrisPieces[this.pieceModel][this.currentAngle].forEach((square) => {
      this.squares.push(new Square(this.color, square.x + currentX, square.y + currentY));
    });
  }
}