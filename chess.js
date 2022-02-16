var t = document.getElementById("tablero");
var ctx = t.getContext("2d");

function cuadrado(color, x, y, width, height)
{
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

var columna = 0;
var lado    = 150;
var x = 0;
var y = 0;
var color1 = "#452a1e";
var color2 = "#dbb779";

for(i=0;i<8;i++)
{
  cuadrado(color1, x, y, lado, lado);
  x += lado;

  cuadrado(color2, x, y, lado, lado);
  x += lado;

  if(i == 7 && columna != 8)
  {
    var aux = color1;
    color1  = color2;
    color2  = aux;
    x = 0;
    y += lado;
    i = 0;
    columna++;
  }
}
