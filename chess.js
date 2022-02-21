var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");

const SQUARE_SIZE = 100; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column
const PIECES_SIZE = 100; // In pixels
const LIGHT_BROWN = "#dbb779";
const DARK_BROWN  = "#452a1e";

var img = new Image();
var pawn = new Pawn("light", 100, 100);
img.src = pawn.src;

var board = new Board(ctx, BOAR_SIZE, SQUARE_SIZE, LIGHT_BROWN, DARK_BROWN);
board.createBoard();
createPiece(img, pawn.x, pawn.y);

//Try to move the pawn
function createPiece(img, x , y)
{
  ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
  img.onload = function()
  {
    ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
  }
}




var arrastrar = false;
var delta = new Object();

function oMousePos(cv, evt) {
  var rect = cv.getBoundingClientRect();
  return { // devuelve un objeto
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top)
  };
}

cv.addEventListener("mousedown", function(evt) {

  var mousePos = oMousePos(cv, evt);
  if((pawn.x < mousePos.x && pawn.x+SQUARE_SIZE > mousePos.x) && (pawn.y < mousePos.y && pawn.y+SQUARE_SIZE > mousePos.y))
  {
    arrastrar = true;
    delta.x = pawn.x - mousePos.x;
    delta.y = pawn.y - mousePos.y;
  }

}, false);

cv.addEventListener("mousemove", function(evt) {
  var mousePos = oMousePos(cv, evt);

  if (arrastrar) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    board.createBoard();
    pawn.x = mousePos.x + delta.x, pawn.y = mousePos.y + delta.y
    ctx.drawImage(img, pawn.x, pawn.y, PIECES_SIZE, PIECES_SIZE); 
  }

}, false);

cv.addEventListener("mouseup", function(evt) {
  var x, y;
  x = Math.trunc((pawn.x + 50) / 100);
  y = Math.trunc((pawn.y + 50) / 100);
  pawn.x = x*100;
  pawn.y = y*100;
  
  ctx.clearRect(0, 0, cv.width, cv.height);
  board.createBoard();
  ctx.drawImage(img, pawn.x, pawn.y, PIECES_SIZE, PIECES_SIZE);
  arrastrar = false;
}, false);
