class Pawn 
{
    constructor(color, x, y)
    {
        this.x = x;
        this.y = y;
        if(color == "light")
        {
            this.name = "P"; 
            this.src = "pieces/white/white-pawn.png"; 
        }
        else
        {
            this.name = "p";
            this.src = "pieces/black/black-pawn.png";
        }
       
    }

}