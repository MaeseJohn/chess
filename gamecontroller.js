const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";
const GREEN = 'rgb(75,130,50,.7)';

const PROMOTION = document.getElementById("modal");
const ROOK_PROMOTION_IMG = document.getElementById("rookimg");
const KNIGHT_PROMOTION_IMG = document.getElementById("knightimg");
const BISHOP_PROMOTION_IMG = document.getElementById("bishopimg");
const QUEEN_PROMOTION_IMG = document.getElementById("queenimg");

let turn = "white";
let pieceWasClicked = false;
let actualSquare;
let clickedSquare;
let validMovements;

const BOARD = new Board(BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
BOARD.initBoard();

let checks = [];

let whiteKing = BOARD.getSquareFromFileRank("E", "1");
let blackKing = BOARD.getSquareFromFileRank("E", "8");

let whiteCastling = {
  king: true,
  queenRook: true,
  kingRook: true,
}

let blackCastling = {
  king: true,
  queenRook: true,
  kingRook: true,
}

function changeTurn()
{
  turn === "white" ? turn = "black" : turn = "white";
}

function drawMovemets()
{
  if(!actualSquare.isEmpty())
  {
    if(actualSquare.getPiece().getColor() === turn)
    {
      validMovements = actualSquare.getPiece().getValidMovements(BOARD, actualSquare);
      BOARD.drawValidMovements(validMovements);
      clickedSquare = actualSquare;
      pieceWasClicked = true;
      return true;
    }
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
    board = board.filter(square => {
      console.log(square);
      if(square.getName() != 'outOfBoard' && !square.isEmpty())
      {
        console.log("aquidentrito")
        if(square.getPiece().getColor() == turn && square.getPiece().getValidMovements(BOARD, square).length > 0)
        {
          console.log("vamos a ver que pasa ahor amacho")
          return square;
        }
      }
    })
    console.log(board.length);
    return board.length == 0;
  }
  return false;
}

function promotion()
{ 
  if(clickedSquare.getPiece().getType() != "pawn")
  {
    return false;
  }

  if(actualSquare.getRank() == 8 || actualSquare.getRank() == 1)
  {
    ROOK_PROMOTION_IMG.src = "pieces/" + turn + "/" + turn + "-rook.png"
    KNIGHT_PROMOTION_IMG.src = "pieces/" + turn + "/" + turn + "-knight.png"
    BISHOP_PROMOTION_IMG.src = "pieces/" + turn + "/" + turn + "-bishop.png"
    QUEEN_PROMOTION_IMG.src = "pieces/" + turn + "/" + turn + "-queen.png"

    PROMOTION.style.display = "block";
    return true;
  }
  return false;
}

PROMOTION.addEventListener('click', promotionEvent);

function promotionEvent(evt)
{
  let rect = PROMOTION.getBoundingClientRect()
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;

  let choice;
  
  if(x > 200 && x < 350 && y > 425 && y < 575)
  {
    choice = "rook";
  }
  if(x > 350 && x < 500 && y > 425 && y < 575)
  {
    choice = "knight";
  }
  if(x > 500 && x < 650 && y > 425 && y < 575)
  {
    choice = "bishop";
  }
  if(x > 650 && x < 800 && y > 425 && y < 575)
  {
    choice = "queen";
  }
  
  window.dispatchEvent(new CustomEvent('PromotionChoice', { detail: choice }));
}

window.addEventListener('PromotionChoice', evt =>
{
  let piece;
  if(evt.detail != null)
  {
    switch(evt.detail)
    {
      case "rook":
        piece = new Rook(turn);
        break;

      case "knight":
        piece = new Knight(turn);
        break;

      case "bishop":
        piece = new Bishop(turn);
        break;

      case "queen":
        piece = new Queen(turn);
        break;
      
      default:
        console.log("Default switch case");
        break;
    }
    clickedSquare.setPiece(piece);
    BOARD.movePiece(clickedSquare, actualSquare);
    changeTurn();

    let king;
    turn == "white" ? king = whiteKing : king = blackKing;
    checks = kingInCheck(king);
    
    if(checkMate())
    {
      console.log("Jaque Mate 2")
    }
  }

  PROMOTION.style.display = "none";
  BOARD.unDrawValidMovements(validMovements);
  pieceWasClicked = false;
  validMovements  = undefined;
  clickedSquare   = undefined;

  console.log(evt.detail);
})

window.addEventListener('boardClick', evt =>
{
  actualSquare = evt.detail;

  if(!pieceWasClicked)
  {
    drawMovemets();
  }
  else if(actualSquare.getName() != clickedSquare.getName())
  {
    if(validMovements.includes(actualSquare))
    {
      if(!promotion())
      {
        if(Math.abs(clickedSquare.getFile().charCodeAt(0) - actualSquare.getFile().charCodeAt(0)) == 2 && clickedSquare.getPiece().getType() == "king")
        {
          BOARD.castlingMove(clickedSquare, actualSquare);
        }
        else
        {
          BOARD.movePiece(clickedSquare, actualSquare);
        }
        BOARD.unDrawValidMovements(validMovements);
        changeTurn();

        let king;
        turn == "white" ? king = whiteKing : king = blackKing;
        checks = kingInCheck(king);
        
        if(checkMate())
        {
          console.log("Jaque Mate1")
        }

        pieceWasClicked = false;
        validMovements  = undefined;
        clickedSquare   = undefined;
      }  
    }
    else
    {
      BOARD.unDrawValidMovements(validMovements);
      if(!drawMovemets())
      {
        pieceWasClicked = false;
        validMovements  = undefined;
        clickedSquare   = undefined;
      }
    }
  }
})








