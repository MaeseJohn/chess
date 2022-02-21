class Square
{

    constructor(ctx, x, y)
    {
        this.ctx = ctx;
        this.x = x;
        this.y = y; 
        this.isEmpty = true;  
    }

    drawSquare(color, x, y, size)
    {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);  
    }

}