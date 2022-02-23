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
}