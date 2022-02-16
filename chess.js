var t = document.getElementById("tablero");
var ctx = t.getContext("2d");

function cuadrado(color, x, y, width, height)
{
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

var linea   = 0;
var columna = 0;
var x = 0;
var y = 0;
var color1 = "#452a1e";
var color2 = "#dbb779";


while(linea < 8)
{
  cuadrado(color1, x, y, 150, 150);
  x += 150;
  cuadrado(color2, x, y, 150,150);
  x += 150;
  linea++;

  if(linea == 8 && columna != 8)
  {
    var aux = color1;
    color1  = color2;
    color2  = aux;
    x = 0;
    y += 150;
    linea = 0;
    columna++;
  }
}
