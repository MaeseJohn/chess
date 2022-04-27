const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";
const GREEN = 'rgb(75,130,50,.7)';

const WIN_MODAL = document.getElementById("winmodal");
const WIN_MODAL_TEXT = document.getElementById("wintext");
const PROMOTION = document.getElementById("modal");
const ROOK_PROMOTION_IMG = document.getElementById("rookimg");
const KNIGHT_PROMOTION_IMG = document.getElementById("knightimg");
const BISHOP_PROMOTION_IMG = document.getElementById("bishopimg");
const QUEEN_PROMOTION_IMG = document.getElementById("queenimg");
const RESET_BUTTON = document.getElementById("resetButton");


const queryString = window.location.search
var loc = window.location;
var uri = 'ws:';

if (loc.protocol === 'https:') {
    uri = 'wss:';
}
uri += '//' + loc.host;
var q;
if(queryString == "?algo=true")
{
    q = 'ws'
}
else
{
  q = 'ws2'
}
uri += loc.pathname + q 

console.log(uri)
console.log(queryString)

ws = new WebSocket(uri)

ws.onopen = function() {
    console.log('Connected')
}

ws.onmessage = function(evt) {
  console.log("onmessage")
  console.log(evt.data)
  let serverData = JSON.parse(evt.data)
  console.log(serverData);

  let pieceSquare = BOARD.getSquareFromFileRank(serverData.pieceSquare.charAt(0), serverData.pieceSquare.charAt(1))
  let destinationSquare = BOARD.getSquareFromFileRank(serverData.destinationSquare.charAt(0), serverData.destinationSquare.charAt(1))

  if(serverData.promotion)
  {
    let piece;
    switch(serverData.promotionChoice)
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
    console.log(pieceSquare);
    console.log(piece);
    pieceSquare.setPiece(piece);
  }

  BOARD.movePiece(pieceSquare, destinationSquare);
  changeTurn();


  if(serverData.checkMate && checkMate())
  {
    winmodal();
  }

}

/*UTTON.onclick = function (){
    chageColor(num)
    let gili = JSON.stringify({
        num: num
    })
    ws.send(gili)
    console.log(gili)
    num++
}*/


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

RESET_BUTTON.onclick = function() {

  turn = "white";
  pieceWasClicked = false;
  actualSquare    = undefined;
  clickedSquare   = undefined;
  validMovements  = undefined;
  checks = [];
  BOARD.initBoard();
  whiteKing = BOARD.getSquareFromFileRank("E", "1");
  blackKing = BOARD.getSquareFromFileRank("E", "8")
  whiteCastling.king      = true;
  whiteCastling.kingRook  = true;
  whiteCastling.queenRook = true;
  blackCastling.king      = true;
  blackCastling.kingRook  = true;
  blackCastling.queenRook = true;

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
      if(square.getName() != 'outOfBoard' && !square.isEmpty())
      {
        if(square.getPiece().getColor() == turn && square.getPiece().getValidMovements(BOARD, square).length > 0)
        {
          return square;
        }
      }
    })
    return board.length == 0;
  }
  return false;
}

function winmodal()
{
  let wincolor;
  turn == "white" ? wincolor = "BLACK" : wincolor = "WHITE"; 
  WIN_MODAL_TEXT.textContent = wincolor + " WIN";
  WIN_MODAL.style.display = "flex";
}

function winevent()
{
  WIN_MODAL.style.display = "none";
}
WIN_MODAL.addEventListener('click', winevent);

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
  let serverData = {
    castling: false,
    checkMate: false,
    promotion: false,
    promotionChoice: "",
    pieceSquare: "",
    destinationSquare: "",
    turn: "",
  }
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
      serverData.checkMate = true;
      winmodal();
    }
    serverData.turn              = turn;
    serverData.promotion         = true;
    serverData.pieceSquare       = clickedSquare.getName();
    serverData.promotionChoice   = piece.getType();
    serverData.destinationSquare = actualSquare.getName();
    ws.send(JSON.stringify(serverData));
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

  let serverData = {
    castling: false,
    checkMate: false,
    promotion: false,
    promotionChoice: "",
    pieceSquare: "",
    destinationSquare: "",
    turn: "",
  }

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
          serverData.castling = true;
          serverData.pieceSquare = clickedSquare.getName();
          serverData.destinationSquare = actualSquare.getName();
        }
        else
        {
          BOARD.movePiece(clickedSquare, actualSquare);
          serverData.pieceSquare = clickedSquare.getName();
          serverData.destinationSquare = actualSquare.getName();
        }

        BOARD.unDrawValidMovements(validMovements);
        changeTurn();
        serverData.turn = turn;

        let king;
        turn == "white" ? king = whiteKing : king = blackKing;
        checks = kingInCheck(king);
        
        if(checkMate())
        {
          winmodal();
          serverData.checkmate = true;
        }

        pieceWasClicked = false;
        validMovements  = undefined;
        clickedSquare   = undefined;
        ws.send(JSON.stringify(serverData));
        console.log(serverData);
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










