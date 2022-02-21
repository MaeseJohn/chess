class Board
{
    constructor(ctx, boardSize, squareSize, lightColor, darkColor)
    {
        this.ctx = ctx;
        this.boardSize = boardSize;
        this.squareSize = squareSize;
        this.lightColor = lightColor;
        this.darkColor = darkColor;
        this.squares = new Array(64);
    }


    createBoard()
    {
        var drawWhite = false;

        for(var r = 0; r < this.boardSize; r++)
        {
            for(var c = 0; c < this.boardSize; c++)
            {
                if(drawWhite)
                {
                    this.squares[c + r*8] = new Square(ctx,  c*this.squareSize, r*this.squareSize);
                    this.squares[c + r*8].drawSquare(this.lightColor, c*this.squareSize, r*this.squareSize, this.squareSize);
                }
                else
                {
                    this.squares[c + r*8] = new Square(ctx,  c*this.squareSize, r*this.squareSize);
                    this.squares[c + r*8].drawSquare(this.darkColor, c*this.squareSize, r*this.squareSize, this.squareSize);
                }
                drawWhite = !drawWhite;
            }
            drawWhite = !drawWhite;
        }
    }
    
}