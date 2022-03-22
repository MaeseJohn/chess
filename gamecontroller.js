const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";
const GREEN = 'rgb(75,130,50,.7)';

let turn = "white";
let pieceWasClicked = false;
let clickedSquare;
let validMovements;

const BOARD = new Board(BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
BOARD.initBoard();

function changeTurn()
{
  if(turn === "white")
  {
    turn = "black";
  }
  else
  {
    turn = "white";
  }
}

function drawMovemets(square)
{
  if(!square.isEmpty())
  {
    console.log("really?");
    if(square.getPiece().getColor() === turn)
    {
      validMovements = square.getPiece().getValidMovements(BOARD, square);
      BOARD.drawValidMovements(validMovements);
      clickedSquare = square;
      pieceWasClicked = true;
    }
    return true;
  }
  return false;
}

window.addEventListener('boardClick', evt =>
{
  let actualSquare = evt.detail;

  if(!pieceWasClicked)
  {
    console.log("primer if");
    drawMovemets(actualSquare);
  }
  else
  {
    BOARD.unDrawValidMovements(validMovements);

    if(validMovements.includes(actualSquare))
    {
      BOARD.movePiece(clickedSquare, actualSquare);
      console.log("tercero if");
      changeTurn();
      pieceWasClicked = false;
      validMovements  = undefined;
      clickedSquare   = undefined;
    }
    else if(!drawMovemets(actualSquare))
    {
      pieceWasClicked = false;
      validMovements  = undefined;
      clickedSquare   = undefined;
    }  
  }
  
  
})








