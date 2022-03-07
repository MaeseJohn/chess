var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");

const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";

const BOARD = new Board(BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
BOARD.initBoard();
///board.createAllPieces();
//board.printAllPieces();


console.log(BOARD.squares);



//Move pieces 


var actualSquare;
var previousSquare;
var pieceClicked = false;

//Return an object with the coordinates / 100 to know what square u click
function oMousePos(cv, evt) 
{
  var rect = cv.getBoundingClientRect();
  return { // devuelve un objeto
    x: Math.trunc(Math.round(evt.clientX - rect.left) / 100),
    y:  Math.trunc(Math.round(evt.clientY - rect.top) / 100)
  };
}

//I use this function to know what color print in the selected square
function printSelectedSquare(x, y)
{
  if(x / 100 % 2 == 0  && y / 100 % 2 == 0)
    {
      board.drawSquare(LIGHT_BROWN, x, y, SQUARE_SIZE); 
    }
    else if(x / 100 % 2 == 1  && y / 100 % 2 == 1)
    {
      board.drawSquare(LIGHT_BROWN, x, y, SQUARE_SIZE); 
    }else
    {
      board.drawSquare(DARK_BROWN, x, y, SQUARE_SIZE);
    }
}

cv.addEventListener("mousedown", function(evt)
{
  var mousePos;
  mousePos = oMousePos(cv, evt);
  actualSquare = board.squares[mousePos.x + mousePos.y * 8];

  if(pieceClicked)
  {
    if(!actualSquare.isEmpty())
    {
      previousSquare = actualSquare;
      previousSquare.pice.showPawnMove();
    }
  }
  else
  {
    if(!actualSquare == previousSquare)
    {
      if(previousSquare.pice.pawnValidMove(mousePos))
      {
        actualSquare.piece = previousSquare.piece;
        previousSquare.piece = new Piece();
      }
    }
  }

  if(!actualSquare.isEmpty())
  {
    actualSquare.piece.showPawnMove();

    
  }
}, false);
/*cv.addEventListener("mousedown", function(evt)
{
  var mousePos;
  mousePos = oMousePos(cv, evt);
  if(!pieceClicked)
  {
    actualSquare = mousePos.x + mousePos.y * 8;
    selectedPiece = board.squares[actualSquare].piece;
    if(selectedPiece != undefined){
      selectedPiece.showPwanMove();
      pieceClicked = true;
    }
    console.log(selectedPiece);
  }
  else if(pieceClicked)
  {
    if(!(selectedPiece.xCoordinate == mousePos.x && selectedPiece.yCoordinate == mousePos.y))
    {
      if(selectedPiece.pawnValidMove(mousePos))
      {
  
        printSelectedSquare(selectedPiece.xCoordinate, selectedPiece.yCoordinate);
        printSelectedSquare(mousePos.x * 100, mousePos.y * 100);
        printPiece(selectedPiece.src, mousePos.x * 100, mousePos.y * 100);
        
        selectedPiece.xCoordinate = mousePos.x * 100;
        selectedPiece.yCoordinate = mousePos.y * 100;
        board.squares[mousePos.x + mousePos.y * 8].piece = selectedPiece;
  
        var emptySquare = new Piece();
        board.squares[actualSquare].piece = emptySquare;
  
        pieceClicked = false;
        console.log(board.squares);
      }
      else
      {
        pieceClicked = false;
      }
    }
  }
}, false);*/






