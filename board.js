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
        var square = file.charCodeAt(0) - 44 + (rank - 8) * -10;
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
        var square = file.charCodeAt(0) - 44 + (rank - 8) * -10;
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
            var rookA = new Rook(color, "A", y);
            this.setPiece("A", y, rookA);

            var knightB = new Knight(color, "B", y);
            this.setPiece("B", y, knightB);

            var bishopC = new Bishop(color, "C", y);
            this.setPiece("C", y, bishopC);

            var king = new King(color, "D", y);
            this.setPiece("D", y, king);

            var queen = new Queen(color, "E", y);
            this.setPiece("E", y, queen);

            var bishopF = new Bishop(color, "F", y);
            this.setPiece("F", y, bishopF);

            var knightG = new Knight(color, "G", y);
            this.setPiece("G", y, knightG); 

            var rookH = new Rook(color, "H", y);
            this.setPiece("H", y, rookH);


            for(var r = 0; r < 8; r++)
            { 
                var pawn = new Pawn(color, String.fromCharCode(65 + r), y - x);
                this.setPiece(String.fromCharCode(65 + r), y - x, pawn);
            }

            color = "white";
            y = 1;
            x = -1;
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
        this.#printAllPieces();
    }

    #printPiece(src, x, y)
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

    #printAllPieces()
    { 
        var xCoordinate = function (f, x)
        {
            return (this.#squares[f + x].getPiece().getFile().charCodeAt(0) - 65) * 100;
        }
        var yCoordinate = function (f, y)
        {
            return (this.#squares[f + y].getPiece().getRank() - 8) * -100;
        }

        for(var i = 0; i < 8; i++)
        {
            this.#printPiece(this.#squares[i + 21].getPiece().getSrc(), xCoordinate.call(this, i, 21), yCoordinate.call(this, i, 21));
            this.#printPiece(this.#squares[i + 31].getPiece().getSrc(), xCoordinate.call(this, i, 31), yCoordinate.call(this, i, 31));
        }
    
        for(var i = 0; i < 8; i++)
        { 
            this.#printPiece(this.#squares[i + 91].getPiece().getSrc(), xCoordinate.call(this, i, 91), yCoordinate.call(this, i, 91));
            this.#printPiece(this.#squares[i + 81].getPiece().getSrc(), xCoordinate.call(this, i, 81), yCoordinate.call(this, i, 81));
        }
    }  
}

    
