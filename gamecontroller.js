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

let checks = [];

let whiteKing = BOARD.getSquareFromFileRank("E", "1");
let blackKing = BOARD.getSquareFromFileRank("E", "8");

function changeTurn()
{
  turn === "white" ? turn = "black" : turn = "white";
}

function drawMovemets(square)
{
  if(!square.isEmpty())
  {
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

function kingInCheck(king)
{

  let destinationSquare;
  let checkPoints = [];
  let knightMovements = [DIRECTION_VALUE.UP_UP_RIGHT, DIRECTION_VALUE.UP_UP_LEFT, DIRECTION_VALUE.LEFT_LEFT_UP, DIRECTION_VALUE.LEFT_LEFT_DOWN, 
  DIRECTION_VALUE.DOWN_DOWN_LEFT, DIRECTION_VALUE.DOWN_DOWN_RIGHT, DIRECTION_VALUE.RIGHT_RIGHT_DOWN, DIRECTION_VALUE.RIGHT_RIGHT_UP];
 
  knightMovements.map(direction => {

    destinationSquare = BOARD.calculatePosition(king.getName(), direction);

    if(destinationSquare.getName() != 'outOfBoard' && !destinationSquare.isEmpty())
    {
      if(destinationSquare.getPiece().getColor() != turn && destinationSquare.getPiece().getType() == "knight")
      {
        checkPoints.push(destinationSquare);
      }
    }
  })

  let queenMovements = [DIRECTION_VALUE.UP, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT, DIRECTION_VALUE.DOWN, 
  DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];

  queenMovements.map(direction => {
        
    destinationSquare = BOARD.calculatePosition(king.getName(), direction);

    while(destinationSquare.getName() != 'outOfBoard' && destinationSquare.isEmpty())
    {
      destinationSquare = BOARD.calculatePosition(destinationSquare.getName(), direction);   
    }
  
    if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.getPiece().getColor() != turn)
    {
      let posibleCheck = false;
      let posibleCheckPieceMovements = destinationSquare.getPiece().getValidMovements(BOARD, destinationSquare);

      posibleCheck = posibleCheckPieceMovements.find(element => {
        return element === king;
      })
        
      if(posibleCheck)
      {
        checkPoints.push(destinationSquare);
      } 
      
    }
  })

  return checkPoints;
}

function checkMate()
{

  if(checks.length > 0)
  {
    let board = BOARD.getSquaresArray()
    board.map(square => {
      if(square.getName() != 'outOfBoard' && !square.isEmpty())
      {
        if(square.getPiece().getColor() == turn && square.getPiece().getValidMovements(BOARD, square).length > 0)
        {
          return false;
        }
      }
    })
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
      if(validMovements.includes(actualSquare))
      {
        BOARD.movePiece(clickedSquare, actualSquare);
        BOARD.unDrawValidMovements(validMovements);
        changeTurn();

        let king;
        turn == "white" ? king = whiteKing : king = blackKing;
        checks = kingInCheck(king);
        
        if(checkMate())
        {
          console.log("Jaque Mate NENE")

        }
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








