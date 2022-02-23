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


console.log(board.squares);



//print and creat maybe need a class?
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
  board.squares[x + y * 8].xCoordinate = x * SQUARE_SIZE;
  board.squares[x + y * 8].yCoordinate = y * SQUARE_SIZE;
    
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
    createPiece(3, y, color, "king");
    createPiece(4, y, color, "queen");
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


//Move pieces 


var actualSquare;
var selectedPiece;
var pieceClicked = false;


function oMousePos(cv, evt) 
{
  var rect = cv.getBoundingClientRect();
  return { // devuelve un objeto
    x: Math.trunc(Math.round(evt.clientX - rect.left) / 100),
    y:  Math.trunc(Math.round(evt.clientY - rect.top) / 100)
  };
}

cv.addEventListener("mousedown", function(evt)
{
  var mousePos;
  if(!pieceClicked)
  {
    mousePos = oMousePos(cv, evt);
    actualSquare = mousePos.x + mousePos.y  * 8;
    console.log(mousePos)
    selectedPiece = board.squares[actualSquare];
    pieceClicked = true;
    console.log(selectedPiece);
  }
  else if(pieceClicked)
  {
    mousePos = oMousePos(cv, evt);

    if(selectedPiece.xCoordinate / 100 % 2 == 0  && selectedPiece.yCoordinate / 100 % 2 == 0)
    {
      board.drawSquare(LIGHT_BROWN, selectedPiece.xCoordinate, selectedPiece.yCoordinate, SQUARE_SIZE); 
    }
    else if(selectedPiece.xCoordinate / 100 % 2 == 1  && selectedPiece.yCoordinate / 100 % 2 == 1)
    {
      board.drawSquare(LIGHT_BROWN, selectedPiece.xCoordinate, selectedPiece.yCoordinate, SQUARE_SIZE); 
    }else
    {
      board.drawSquare(DARK_BROWN, selectedPiece.xCoordinate, selectedPiece.yCoordinate, SQUARE_SIZE);
    }
    
    printPiece(selectedPiece.src, mousePos.x * 100, mousePos.y * 100);
    
    selectedPiece.xCoordinate = mousePos.x * 100;
    selectedPiece.yCoordinate = mousePos.y * 100;
    board.squares[mousePos.x + mousePos.y * 8] = selectedPiece;

    var emptySquare = new Piece();
    emptySquare.isEmpty = true;
    board.squares[actualSquare] = emptySquare;

    pieceClicked = false;
    console.log(board.squares);
  }
}, false);

cv.addEventListener("mouseup", function(evt)
{
  if(pieceClicked)
  {
    if(selectedPiece.isEmpty)
    {
      pieceClicked = false;
    }
  }
}, false)




