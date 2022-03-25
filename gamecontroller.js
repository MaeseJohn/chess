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
    if(square.getPiece().getColor() === turn)
    {
      validMovements = square.getPiece().getValidMovements(BOARD, square);
      BOARD.drawValidMovements(validMovements);
      console.log("movimientos validos pintados");
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
    drawMovemets(actualSquare);
  }
  else
  {
    if(actualSquare.getName() != clickedSquare.getName())
    {
      console.log("entro");
      if(validMovements.includes(actualSquare))
      {
        BOARD.movePiece(clickedSquare, actualSquare);
        BOARD.unDrawValidMovements(validMovements);
        changeTurn();
        pieceWasClicked = false;
        validMovements  = undefined;
        clickedSquare   = undefined;
      }
      else
      {
        BOARD.unDrawValidMovements(validMovements);
        if(!drawMovemets(actualSquare))
        {
          pieceWasClicked = false;
          validMovements  = undefined;
          clickedSquare   = undefined;
        }
      }
    }
  }
  
  
})








