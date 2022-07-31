const SQUARE_SIZE = 95; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 95; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";
const YELLOW      = 'rgb(245, 249, 33, .9)';
const GREEN       = 'rgb(75, 130, 50, .7)';
const queryString = window.location.search

let token;
let ws;

const MODAL_TEXT_DIV       = document.getElementById("modaltextdiv");
const MODAL_TEXT           = document.getElementById("modaltext");
const PROMOTION            = document.getElementById("modal");
const ROOK_PROMOTION_IMG   = document.getElementById("rookimg");
const KNIGHT_PROMOTION_IMG = document.getElementById("knightimg");
const BISHOP_PROMOTION_IMG = document.getElementById("bishopimg");
const QUEEN_PROMOTION_IMG  = document.getElementById("queenimg");
const LINK_BUTTON          = document.getElementById("linkbutton");
const NEW_GAME_BUTTON      = document.getElementById("newgamebutton");


// BUTTONS //
LINK_BUTTON.onclick = function ()
{
  let copyurl = window.location.href + '?token=' + token;
  navigator.clipboard.writeText(copyurl);
  copylinkmodal();
}

NEW_GAME_BUTTON.onclick = function ()
{
  BOARD.initBoard();
  initGameVariables();
  uri = makeUri();
  websocketconection();
  newgamemodal();
}

// MODAL FUNCTIONSS //

function newgamemodal()
{
  MODAL_TEXT.textContent = 'Click on "Copy link" to obtain the share link.';
  MODAL_TEXT_DIV.style.display = "inline-block";
}

function copylinkmodal()
{
  MODAL_TEXT.textContent = 'The share link has been copied to your clipboard.';
  MODAL_TEXT_DIV.style.display = "inline-block";
}

function winmodal()
{
  let wincolor;
  turn == "white" ? wincolor = "BLACK" : wincolor = "WHITE"; 
  MODAL_TEXT.textContent = wincolor + " WIN";
  MODAL_TEXT_DIV.style.display = "inline-block";
}

function hidemodal()
{
  MODAL_TEXT_DIV.style.display = "none";
}

MODAL_TEXT_DIV.addEventListener('click', hidemodal);

// WEBSOCKET FUNCTIONS //

let uri = makeUri();

if(queryString != '')
{
  websocketconection();
}

function websocketconection()
{
  ws = new WebSocket(uri)

  ws.onopen = function() {
    console.log('Connected')
  }
  
  ws.onmessage = function(evt) {
  
    let serverData = JSON.parse(evt.data)

    if(serverData.player2)
    {
      player2 = true;
    }

    if(serverData.playerColor != "" && playerColor == "")
    {
      playerColor = serverData.playerColor
    }

    if(lastMove != undefined)
    {
      BOARD.unDrawValidMovements(lastMove)
    }
  
    if(serverData.pieceSquare != "" && serverData.destinationSquare != "")
    {
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
        pieceSquare.setPiece(piece);
      }
  
      if(serverData.castling)
      {
        BOARD.castlingMove(pieceSquare, destinationSquare);
      }
      else
      {
        BOARD.movePiece(pieceSquare, destinationSquare)
      }

      lastMove = [pieceSquare, destinationSquare];
      changeTurn();
    
      let king;
      turn == "white" ? king = whiteKing : king = blackKing;
      checks = kingInCheck(king);
    
      if(serverData.checkmate && checkMate())
      {
        let finish = {
          finish: true
        }
        winmodal();
        ws.send(JSON.stringify(finish))
      }
    }
  
  }
}

function makeUri()
{
  //CREATING A TOKEN  
  var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
  };
  
  var tokengenerator = function() {
    return rand() + rand(); // to make it longer
  };

  
  let loc = window.location;
  let uri;

  uri = loc.href.charAt(4) == 's' ? 'wss:' : 'ws:'

  uri += '//' + loc.host;
  
  let q;
  if(queryString == '')
  {
    token = tokengenerator()
    q = 'createGame' + '?token=' + token
  }
  else
  {
    q = 'joinGame' + queryString
  }
  uri += loc.pathname + q 
  
  return uri;
}

// GAME VARIABLES //

let turn;
let pieceWasClicked;
let actualSquare;
let clickedSquare;
let validMovements;
let checks;
let whiteKing;
let blackKing;
let playerColor;
let player2;
let lastMove;

function initGameVariables()
{
  turn            = "white";
  checks          = [];
  player2         = false;
  playerColor     = "";
  pieceWasClicked = false;
  actualSquare    = undefined;
  clickedSquare   = undefined;
  validMovements  = [];
  lastMove        = undefined;
  whiteKing = BOARD.getSquareFromFileRank("E", "1");
  blackKing = BOARD.getSquareFromFileRank("E", "8");
}

//  CREATE BOARD //
const BOARD = new Board(BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
BOARD.initBoard();
initGameVariables();

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

// CHECK FUNCTIONS //
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

// PROMOTION //
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
  let promotioncontent = document.getElementById('modalcontent');
  let rect = promotioncontent.getBoundingClientRect()
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;
  console.log(rect)
  console.log(x, y)

  let choice;
  
  if(x > 0 && x < 150 && y > 0 && y < 150)
  {
    choice = "rook";
  }
  if(x > 150 && x < 300 && y > 0 && y < 150)
  {
    choice = "knight";
  }
  if(x > 300 && x < 450 && y > 0 && y < 150)
  {
    choice = "bishop";
  }
  if(x > 450 && x < 600 && y > 0 && y < 150)
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

})

// COMUN FUNCTIONS //
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

  if(playerColor != turn || !player2)
  {
    return
  }

  if(!pieceWasClicked)
  {
    drawMovemets();
  }
  else if(actualSquare.getName() != clickedSquare.getName())
  {

    BOARD.unDrawValidMovements(validMovements);

    if(!validMovements.includes(actualSquare))
    {
      if(!drawMovemets())
      {
        pieceWasClicked = false;
        validMovements  = undefined;
        clickedSquare   = undefined;
      }
      return
    }

    if(promotion())
    {
     return
    }

    if(lastMove != undefined)
    {
      BOARD.unDrawValidMovements(lastMove)
    }

    if(Math.abs(clickedSquare.getFile().charCodeAt(0) - actualSquare.getFile().charCodeAt(0)) == 2 && clickedSquare.getPiece().getType() == "king")
    {
      BOARD.castlingMove(clickedSquare, actualSquare);
      serverData.castling = true;
    }
    else
    {
      BOARD.movePiece(clickedSquare, actualSquare);
    }

    lastMove = [clickedSquare, actualSquare];

    serverData.pieceSquare = clickedSquare.getName();
    serverData.destinationSquare = actualSquare.getName();

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
  }
})










