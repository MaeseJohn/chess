var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");

class Board
{
    #boardSize
    #squaresize
    #lightColor
    #darkColor
    #squares
    constructor(boardSize, squaresize, lightColor, darkColor)
    {
        this.#boardSize = boardSize;
        this.#squaresize = squaresize;
        this.#lightColor = lightColor;
        this.#darkColor = darkColor;
        this.#squares = new Array(120);
    }

    
    //GETTERS
    getPiece(file, rank)
    {
        let square = file.charCodeAt(0) - 44 + (rank - 8) * -10;
        if(!this.#squares[square].isOutOfBoard())
        {
            return this.#squares[square].getPiece();
        }
    }
    
    getSquare(x, y)
    {
        return this.#squares[x + 21 + y * 10];
    }
    
    getBoard()
    {
        return this.#squares;
    }
    
    //SETTERS
    setPiece(file, rank, piece)
    {
        let square = file.charCodeAt(0) - 44 + (rank - 8) * -10;
        if(!this.#squares[square].isOutOfBoard())
        {
            this.#squares[square].setPiece(piece);
        }
    }
    
    //METHODS

    #drawSquare(color, x, y, size)
    {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);  
    }

    #setStartPiecesPos()
    {
        var color = "black";
        var y = 8;
        var x = 1;
        
        for(var i = 0; i < 2; i++)
        {
            /*this.setPiece("A", y, color, "rook");
            this.setPiece("B", y, color, "knight");
            this.setPiece("C", y, color, "bishop");
            this.setPiece("D", y, color, "king");
            this.setPiece("E", y, color, "queen");
            this.setPiece("F", y, color, "bishop"); 
            this.setPiece("G", y, color, "knight"); 
            this.setPiece("H", y, color, "rook");*/

            for(var r = 0; r < 8; r++)
            { 
                var pawn = new Pawn(color, String.fromCharCode(65 + r), y - x);
                this.setPiece(String.fromCharCode(65 + r), y - x, pawn);
            }

            color = "white";
            y = 0;
            x = -2;
        }
    }

    initBoard()
    {
        for(var i = 0; i < this.#squares.length; i++)
        {
            this.#squares[i]= new Square();
        }

        var drawWhite = true;
        var switchName = 8;

        for(var r = 0; r < this.#boardSize; r++)
        {
            
            for(var c = 0; c < this.#boardSize; c++)
            {
                var tmp = (c + 21 + r * 10);
                var squareName = (String.fromCharCode(65 + c) + switchName);
                if(drawWhite)
                {
                    this.#squares[tmp] = new Square(this.#lightColor, squareName);
                    this.#drawSquare(this.#lightColor, c * this.#squaresize, r * this.#squaresize, this.#squaresize);
                }
                else
                {
                    this.#squares[tmp] = new Square(this.#darkColor, squareName);
                    this.#drawSquare(this.#darkColor,  c * this.#squaresize, r * this.#squaresize, this.#squaresize);
                }
                drawWhite = !drawWhite;
            }
            switchName--;
            drawWhite = !drawWhite;
        }
        this.#setStartPiecesPos();
    }

    printPiece(src, x, y)
    {
        var img = new Image();
        img.src = src;

        ctx.drawImage(img, x, y, this.#squaresize, this.#squaresize);
        
        img.onload = (function()
        {
            ctx.drawImage(img, x, y, this.#squaresize, this.#squaresize);
        }).bind(this)
        //Investigate bind
    }
/*
    printAllPieces()
    { 
      for(var i = 0; i < 8; i++)
      {
        this.printPiece(this.#squares[i].piece.src, this.#squares[i].piece.xCoordinate, this.#squares[i].piece.yCoordinate);
        this.printPiece(this.#squares[i + 8].piece.src, this.#squares[i + 8].piece.xCoordinate, this.#squares[i + 8].piece.yCoordinate);
      }
    
      for(var i = 0; i < 8; i++)
      { 
        this.printPiece(this.#squares[i + 56].piece.src, this.#squares[i + 56].piece.xCoordinate, this.#squares[i + 56].piece.yCoordinate);
        this.printPiece(this.#squares[i + 48].piece.src, this.#squares[i + 48].piece.xCoordinate, this.#squares[i + 48].piece.yCoordinate);
      }
    }  */
}

    
