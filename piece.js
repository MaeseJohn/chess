var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");

class Piece
{
    xCoordinate;
    yCoordinate;
    isEmpty;
    constructor(color, type)
    {
        this.isEmpty = false;
        this.color  = color;
        this.type = type;
        this.src = "pieces/"+ color + "/" + color + "-" + type + ".png";
    }

    squareColor(x, y, size)
    {
        ctx.fillStyle = 'rgba(145, 201, 48, 0.5)';
        ctx.fillRect(x, y, size, size);  
    }

    //PAWNS
    showPwanMove()
    {
        if(this.color == "black")
        {
            if(this.yCoordinate == 600)
            {
                this.squareColor(this.xCoordinate, this.yCoordinate - 100, 100);
                this.squareColor(this.xCoordinate, this.yCoordinate - 200, 100);
            }
            else
            {
                this.squareColor(this.xCoordinate, this.yCoordinate -100, 100);
            }
        }
        else
        {
            if(this.yCoordinate == 100)
            {
                this.squareColor(this.xCoordinate, this.yCoordinate + 100, 100);
                this.squareColor(this.xCoordinate, this.yCoordinate + 200, 100);
            }
            else
            {
                this.squareColor(this.xCoordinate, this.yCoordinate + 100, 100);
            }

        }
    }
}