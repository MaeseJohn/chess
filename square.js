class Square
{
    pieceObjet;
    constructor(ctx, x, y)
    {
        this.ctx = ctx;
        this.x = x;
        this.y = y; 
    }

    drawSquare(color, x, y, size)
    {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);  
    }

}