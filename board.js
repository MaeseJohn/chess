const DIRECTION_VALUE =
{
    UP:-10,
    UP_LEFT:-11,
    UP_RIGHT:-9,
    UP_UP_RIGHT:-19,
    UP_UP_LEFT:-21,
    LEFT:-1,
    LEFT_LEFT_UP:-12,
    LEFT_LEFT_DOWN:8, 
    RIGHT:1,
    RIGHT_RIGHT_DOWN:12, 
    RIGHT_RIGHT_UP:-8,
    DOWN:10,
    DOWN_LEFT:9,
    DOWN_RIGHT:11,
    DOWN_DOWN_LEFT:19,
    DOWN_DOWN_RIGHT:21,
};


class Board
{
    #cv
    #ctx
    #boardSize
    #squaresize
    #lightColor
    #darkColor
    #squares
    #PIECE_DIRECTION_VALUE

    constructor(boardSize, squaresize, lightColor, darkColor)
    {
        this.#cv = document.getElementById("canvas");
        this.#ctx = this.#cv.getContext("2d");
        this.#boardSize = boardSize;
        this.#squaresize = squaresize;
        this.#lightColor = lightColor;
        this.#darkColor = darkColor;
        this.#squares = new Array(120);

        this.#cv.addEventListener("mousedown", this.#boardClickEvent.bind(this))
    }


    #boardClickEvent(evt)
    {
        let rect = this.#cv.getBoundingClientRect();
        let x = Math.trunc(Math.round(evt.clientX - rect.left) / 100);
        let y = Math.trunc(Math.round(evt.clientY - rect.top) / 100);
            
        let actualSquare = this.getSquare(x, y);
        //const event = new CustomEvent('boardClick', { detail: actualSquare });
        window.dispatchEvent(new CustomEvent('boardClick', { detail: actualSquare }));
    }

    #getIndexFromFileRank(file, rank)
    {
        return file.charCodeAt(0) - 44 + (rank - 8) * -10;
    }

    
    //GETTERS
    getPiece(file, rank)
    {
        let squareIndex = this.#getIndexFromFileRank(file, rank)
        if(!this.#squares[squareIndex].isOutOfBoard())
        {
            return this.#squares[squareIndex].getPiece();
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
        let squareIndex = this.#getIndexFromFileRank(file, rank);
        if(!this.#squares[squareIndex].isOutOfBoard())
        {
            this.#squares[squareIndex].setPiece(piece);
        }
    }
    
    //METHODS

    #drawSquare(color, x, y, size)
    {
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(x, y, size, size);  
    }

    #setStartPiecesPos()
    {
        let color = "black";
        let y = 8;
        let x = 1;
        
        for(var i = 0; i < 2; i++)
        {
            let rookA = new Rook(color, "A", y);
            this.setPiece("A", y, rookA);

            let knightB = new Knight(color, "B", y);
            this.setPiece("B", y, knightB);

            let bishopC = new Bishop(color, "C", y);
            this.setPiece("C", y, bishopC);

            let king = new King(color, "D", y);
            this.setPiece("D", y, king);

            let queen = new Queen(color, "E", y);
            this.setPiece("E", y, queen);

            let bishopF = new Bishop(color, "F", y);
            this.setPiece("F", y, bishopF);

            let knightG = new Knight(color, "G", y);
            this.setPiece("G", y, knightG); 

            let rookH = new Rook(color, "H", y);
            this.setPiece("H", y, rookH);


            for(var r = 0; r < 8; r++)
            { 
                let pawn = new Pawn(color, String.fromCharCode(65 + r), y - x);
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

        let drawWhite = true;
        let switchName = 8;

        for(var r = 0; r < this.#boardSize; r++)
        {
            
            for(var c = 0; c < this.#boardSize; c++)
            {
                let tmp = (c + 21 + r * 10);
                let squareName = (String.fromCharCode(65 + c) + switchName);
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
        let img = new Image();
        img.src = src;

        this.#ctx.drawImage(img, x, y, this.#squaresize, this.#squaresize);
        
        img.onload = (function()
        {
            this.#ctx.drawImage(img, x, y, this.#squaresize, this.#squaresize);
        }).bind(this)
        //Investigate bind
    }

    #printAllPieces()
    { 
        let xCoordinate = (f, x) => (this.#squares[f + x].getPiece().getFile().charCodeAt(0) - 65) * 100;

        let yCoordinate = (f, y) => (this.#squares[f + y].getPiece().getRank() - 8) * -100;
      

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

    calculatePosition(file, rank, direction)
    {
        let squareIndex = this.#getIndexFromFileRank(file, rank);
        let destinationSquareIndex = squareIndex + direction;

        return this.#squares[destinationSquareIndex];
    }
 
}

    
