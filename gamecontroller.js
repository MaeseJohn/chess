const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";

const BOARD = new Board(BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
BOARD.initBoard();

window.addEventListener('boardClick', evt =>
{
  console.log(evt.detail.getPiece());
  if(!evt.detail.isEmpty())
  {
    evt.detail.getPiece().getValidMovements(BOARD);
  }

  
  
})








