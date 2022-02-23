class Piece
{
    xCoordinate;
    ycoordinete;
    src;

    constructor(color, type)
    {
        this.color  = color;
        this.type = type;
        this.src = "pieces/"+ color + "/" + color + "-" + type + ".png";
    }

    
    


    
}