var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");

class Board
{
    constructor(boardSize, squareSize, lightColor, darkColor)
    {
        this.boardSize = boardSize;
        this.squareSize = squareSize;
        this.lightColor = lightColor;
        this.darkColor = darkColor;
        this.squares = new Array(120);
    }

    drawSquare(color, x, y, size)
    {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);  
    }

    initBoard()
    {
        for(var i = 0; i < this.squares.length; i++)
        {
            this.squares[i]= new Square();
        }

        var drawWhite = true;

        for(var r = 0; r < this.boardSize; r++)
        {
            for(var c = 0; c < this.boardSize; c++)
            {
                var tmp = (c + 21 + r * 10);
                var squareName = (String.fromCharCode(65 + c) + (r + 1));
                if(drawWhite)
                {
                    this.squares[tmp] = new Square(this.lightColor, squareName);
                    this.drawSquare(this.lightColor, c * this.squareSize, r * this.squareSize, this.squareSize);
                }
                else
                {
                    this.squares[tmp] = new Square(this.darkColor, squareName);
                    this.drawSquare(this.darkColor,  c * this.squareSize, r * this.squareSize, this.squareSize);
                }
                drawWhite = !drawWhite;
            }
            drawWhite = !drawWhite;
        }
    }

    getPiece(file, rank)
    {
        let square = file.charCodeAt(0) - 44 + (rank - 1) * 10;
        if(!this.squares[square].autOfBoard())
        {
            return this.squares[tmpFile + (rank - 1) * 10].piece;
        }
    }

    setPiece(file, rank, piece)
    {
        let square = file.charCodeAt(0) - 44 + (rank - 1) * 10;
        if(!this.squares[square].autOfBoard())
        {
            this.squares[square].setPiece(piece);
        }
    }




    /*createPiece(x, y, color, type)
    {
        this.squares[x + y * 8].addPiece(new Piece(color, type, x * this.squareSize, y * this.squareSize));
    }


    createAllPieces()
    { 
        var color = "white";
        var y = 0;
        var x = 1;

        for(var i = 0; i < 2; i++)
        {
        
            this.createPiece(0, y, color, "rook");
            this.createPiece(1, y, color, "knight");
            this.createPiece(2, y, color, "bishop");
            this.createPiece(3, y, color, "king");
            this.createPiece(4, y, color, "queen");
            this.createPiece(5, y, color, "bishop"); 
            this.createPiece(6, y, color, "knight"); 
            this.createPiece(7, y, color, "rook");

            for(var r = 0; r < 8; r++)
            { 
                //Creating pawns
                this.createPiece(r, y + x, color, "pawn");
            }

            color = "black";
            y = 7;
            x = x - 2;
        }
    }

    printPiece(src, x , y)
    {
        var img = new Image();
        img.src = src;

        ctx.drawImage(img, x, y, this.squareSize, this.squareSize);
        
        img.onload = (function()
        {
            ctx.drawImage(img, x, y, this.squareSize, this.squareSize);
        }).bind(this)
        //Investigate bind
    }

    printAllPieces()
    { 
      for(var i = 0; i < 8; i++)
      {
        this.printPiece(this.squares[i].piece.src, this.squares[i].piece.xCoordinate, this.squares[i].piece.yCoordinate);
        this.printPiece(this.squares[i + 8].piece.src, this.squares[i + 8].piece.xCoordinate, this.squares[i + 8].piece.yCoordinate);
      }
    
      for(var i = 0; i < 8; i++)
      { 
        this.printPiece(this.squares[i + 56].piece.src, this.squares[i + 56].piece.xCoordinate, this.squares[i + 56].piece.yCoordinate);
        this.printPiece(this.squares[i + 48].piece.src, this.squares[i + 48].piece.xCoordinate, this.squares[i + 48].piece.yCoordinate);
      }
    }  */
}

    
