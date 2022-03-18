const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";
const GREEN = 'rgb(75,130,50,.7)';

let turn = "white";
let pieceWasClicked = false;
let clickedPiece;
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

window.addEventListener('boardClick', evt =>
{
  let square = evt.detail;

  if(!pieceWasClicked && !square.isEmpty())
  {
    if(square.getPiece().getColor() === turn)
    {
      clickedPiece = square.getPiece();
      pieceWasClicked = true;
      validMovements = clickedPiece.getValidMovements(BOARD);
      BOARD.drawValidMovements(validMovements);
    }
  }
  else if(pieceWasClicked)
  {
    BOARD.unDrawValidMovements(validMovements);
    
    if(validMovements.includes(square))
    {
      changeTurn();
      pieceWasClicked = false;
      validMovements  = undefined;
      clickedPiece    = undefined;
    }
    else
    {
      pieceWasClicked = false;
      validMovements  = undefined;
      clickedPiece    = undefined;
    }
  }
  
  
})








