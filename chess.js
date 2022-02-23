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
  var color = "white";
  var y = 0;
  var x = 1;
  for(var i = 0; i < 2; i++)
  {
   
    createPiece(0, y, color, "rook");
    createPiece(1, y, color, "knight");
    createPiece(2, y, color, "bishop");
    createPiece(3, y, color, "queen");
    createPiece(4, y, color, "king");
    createPiece(5, y, color, "bishop"); 
    createPiece(6, y, color, "knight"); 
    createPiece(7, y, color, "rook");
  

    for(var r = 0; r < 8; r++)
    { 
      //Creating pawns
      createPiece(r, y + x, color, "pawn");
    }

    color = "black";
    y = 7;
    x = x - 2;
  }
}

function printAllPieces()
{
    
  for(var i = 0; i < 8; i++)
  {
    printPiece(board.squares[i].src, board.squares[i].xCoordinate, board.squares[i].yCoordinate);
    printPiece(board.squares[i + 8].src, board.squares[i + 8].xCoordinate, board.squares[i + 8].yCoordinate);
  }

  for(var i = 0; i < 8; i++)
  { 
    printPiece(board.squares[i + 56].src, board.squares[i + 56].xCoordinate, board.squares[i + 56].yCoordinate);
    printPiece(board.squares[i + 48].src, board.squares[i + 48].xCoordinate, board.squares[i + 48].yCoordinate);
  }
}


