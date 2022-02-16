var t = document.getElementById("board");
var ctx = t.getContext("2d");

const SQUARE_SIZE = 150; // In pixels
const BOAR_SIZE   = 8;  // Namber of squares in a row and column

function createSquare(color, x, y, width, height)
{
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

createBoard();

function createBoard()
{
  const lightBrown = "#452a1e";
  const darkBrown  = "#dbb779";
  var drawWhite    = false;

  for(r = 0; r < BOAR_SIZE; r++)
  {
    for(c = 0; c < BOAR_SIZE; c++)
    {
      if(drawWhite)
      {
        createSquare(lightBrown, c*SQUARE_SIZE, r*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
      }
      else
      {
        createSquare(darkBrown, c*SQUARE_SIZE, r*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
      }
      drawWhite = !drawWhite;
    }
    drawWhite = !drawWhite;
  }
}
