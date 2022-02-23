class Printer
{
    constructor(ctx)
    {
        this.ctx = ctx
    }

    printPiece(src, x , y)
    {
        var img = new Image();
        img.src = src;

        this.ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
        img.onload = function()
        {
            this.ctx.drawImage(img, x, y, PIECES_SIZE, PIECES_SIZE);
        }
    }

    createPieces()
    {
        for(var i = 0; i < 8; i++)
        {
            board.squares[i] = new Piece("white", "rook");
            board.squares[i].xCoordinate = i*100;
            board.squares[i].yCoordinate = 0;
            printPiece(board.squares[i].src, board.squares[i].xCoordinate, board.squares[i].yCoordinate);

        }
    }
}