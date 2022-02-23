var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");

const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";

var board = new Board(ctx, BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
board.createBoard();
createAllPieces();
printAllPieces();

function printPiece(src, x , y)
{
    var img = new Image();
    img.src = src;

    ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
    img.onload = function()
    {
      ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
    }
}

function createPiece(x, y, color, type)
{
  board.squares[x + y * 8] = new Piece(color, type);
  board.squares[x + y * 8].xCoordinate = x*SQUARE_SIZE;
  board.squares[x + y * 8].yCoordinate = y*SQUARE_SIZE;
    
}

function createAllPieces()
{ 
  createPiece(0, 0, "white", "rook");
  createPiece(1, 0, "white", "knight");
  createPiece(2, 0, "white", "bishop");
  createPiece(3, 0, "white", "queen");
  createPiece(4, 0, "white", "king");
  createPiece(5, 0, "white", "bishop"); 
  createPiece(6, 0, "white", "knight"); 
  createPiece(7, 0, "white", "rook");

  for(var i = 0; i < 8; i++)
  { 
    //Creating pawns
    createPiece(i, 1, "white", "pawn");
  }
}

function printAllPieces()
{
  printPiece(board.squares[0].src, board.squares[0].xCoordinate, board.squares[0].yCoordinate);
  printPiece(board.squares[1].src, board.squares[1].xCoordinate, board.squares[1].yCoordinate);
  printPiece(board.squares[2].src, board.squares[2].xCoordinate, board.squares[2].yCoordinate);
  printPiece(board.squares[3].src, board.squares[3].xCoordinate, board.squares[3].yCoordinate);
  printPiece(board.squares[4].src, board.squares[4].xCoordinate, board.squares[4].yCoordinate);
  printPiece(board.squares[5].src, board.squares[5].xCoordinate, board.squares[5].yCoordinate);
  printPiece(board.squares[6].src, board.squares[6].xCoordinate, board.squares[6].yCoordinate);
  printPiece(board.squares[7].src, board.squares[7].xCoordinate, board.squares[7].yCoordinate);
 

  for(var i = 0; i < 8; i++)
  { 
    printPiece(board.squares[i + 8].src, board.squares[i + 8].xCoordinate, board.squares[i + 8].yCoordinate);
  }
}


