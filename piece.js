var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
const VALID_MOVES_COLOR = 'rgba(145, 201, 48, 0.5)';

class Piece
{
    #color;
    #type;
    #file;
    #rank;
    #src;
    constructor(color, type, file, rank)
    {
        this.#color  = color;
        this.#type = type;
        this.#file = file;
        this.#rank = rank;
        this.#src = "pieces/" + color + "/" + color + "-" + type + ".png";
    }

    getType()
    {
        return this.#type;
    }

    getColor()
    {
        return this.#color;
    }
    
    getSrc()
    {
        return this.#src;
    }
    
    getRank()
    {
        return this.#rank;
    }

    getFile()
    {
        return this.#file;
    }
    /*squareColor(x, y, size, color)
    {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);  
    }

    //PAWNS
    showPwanMove()
    {
        if(this.color == "black")
        {
            if(this.yCoordinate == 600)
            {
                this.squareColor(this.xCoordinate, this.yCoordinate - 100, 100, VALID_MOVES_COLOR);
                this.squareColor(this.xCoordinate, this.yCoordinate - 200, 100, VALID_MOVES_COLOR);
            }
            else
            {
                this.squareColor(this.xCoordinate, this.yCoordinate -100, 100, VALID_MOVES_COLOR);
            }
        }
        else
        {
            if(this.yCoordinate == 100)
            {
                this.squareColor(this.xCoordinate, this.yCoordinate + 100, 100, VALID_MOVES_COLOR);
                this.squareColor(this.xCoordinate, this.yCoordinate + 200, 100, VALID_MOVES_COLOR);
            }
            else
            {
                this.squareColor(this.xCoordinate, this.yCoordinate + 100, 100, VALID_MOVES_COLOR);
            }
        }
    }
    

    pawnValidMove(mousePos)
    {
        if(this.color == "black")
        {
            if(this.yCoordinate == 600)
            {
                return ((mousePos.y * 100 ==  this.yCoordinate - 100 || mousePos.y * 100 == this.yCoordinate - 200) && (mousePos.x * 100 == this.xCoordinate));
            }
            else
            {
                console.log("black despues de 600");
                return ((mousePos.y * 100 == this.yCoordinate - 100) && (mousePos.x * 100 == this.xCoordinate));
            }
        }
        else
        {
            if(this.yCoordinate == 100)
            {
                return ((mousePos.y * 100 == this.yCoordinate + 100 || mousePos.y * 100 ==  this.yCoordinate + 200)  && (mousePos.x * 100 == this.xCoordinate));
            }
            else
            {
                return ((mousePos.y * 100 == this.yCoordinate + 100) && (mousePos.x * 100 == this.xCoordinate));
            }
        }
    }*/
}