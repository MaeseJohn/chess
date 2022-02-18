var t = document.getElementById("canvas");
var ctx = t.getContext("2d");

const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";

const WHITE_PIECES_SRC = {
  PAWN:  "pieces/white/white-pawn.png",
  BISHOP:"pieces/white/white-bishop.png",
  KNIGHT:"pieces/white/white-knight.png",
  ROOK:  "pieces/white/white-rook.png",  
  KING:  "pieces/white/white-king.png",
  QUEEN: "pieces/white/white-queen.png"
};
const BLACK_PIECES_SRC = {
  PAWN:  "pieces/black/black-pawn.png",
  BISHOP:"pieces/black/black-bishop.png",
  KNIGHT:"pieces/black/black-knight.png",
  ROOK:  "pieces/black/black-rook.png",  
  KING:  "pieces/black/black-king.png",
  QUEEN: "pieces/black/black-queen.png"
};


putAllPieces();
var board = new Board(ctx, BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
board.createBoard();

function putAllPieces()
{
  putOneSizePieces(WHITE_PIECES_SRC, 7);
  putOneSizePieces(BLACK_PIECES_SRC, 0);
}

function putOneSizePieces(piecesSource, y)
{
  createPiece(piecesSource.ROOK, 0*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.KNIGHT, 1*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.BISHOP, 2*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.QUEEN, 3*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.KING, 4*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.BISHOP, 5*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.KNIGHT, 6*SQUARE_SIZE, y*SQUARE_SIZE);
  createPiece(piecesSource.ROOK, 7*SQUARE_SIZE, y*SQUARE_SIZE);

  if(y == 0)
  {
    y++;
  }
  else if (y == 7)
  {
    y--;
  }
  
  for(i = 0; i < 8; i++)
  {
    createPiece(piecesSource.PAWN, i*SQUARE_SIZE, y*SQUARE_SIZE);
  }
}

function createPiece(src, x, y)
{
  var img = new Image();
  img.src = src;
  ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);

  img.onload = function()
  {
    ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
  }
}
