const DIRECTION_VALUE =
{
    RIGHT:1,
    LEFT_LEFT_DOWN:8, 
    DOWN_LEFT:9,
    DOWN:10,
    DOWN_RIGHT:11,
    RIGHT_RIGHT_DOWN:12, 
    DOWN_DOWN_LEFT:19,
    DOWN_DOWN_RIGHT:21,
    UP_UP_LEFT:-21,
    UP_UP_RIGHT:-19,
    LEFT_LEFT_UP:-12,
    UP_LEFT:-11,
    UP:-10,
    UP_RIGHT:-9,
    RIGHT_RIGHT_UP:-8,
    LEFT:-1,
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
    constructor(boardSize, squaresize, lightColor, darkColor)
    {
        this.#cv = document.getElementById("canvas");
        this.#ctx = this.#cv.getContext("2d");
        this.#boardSize = boardSize;
        this.#squaresize = squaresize;
        this.#lightColor = lightColor;
        this.#darkColor = darkColor;
        this.#squares = new Array(120);

        this.#cv.addEventListener("click", this.#boardClickEvent.bind(this))
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
    
    getSquareFromFileRank(file, rank)
    {
        let squareIndex = this.#getIndexFromFileRank(file, rank)
        return this.#squares[squareIndex];    
    }
    
    getSquare(x, y)
    {
        return this.#squares[x + 21 + y * 10];
    }
    
    getSquaresArray()
    {
        return this.#squares;
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
    
    
    /////////////////////////////////
    ////////MOVEMETS METHODS/////////
   ///////////////////////////////// 

    #boardClickEvent(evt)
    {
        let rect = this.#cv.getBoundingClientRect();
        let x = Math.trunc(Math.round(evt.clientX - rect.left) / 95);
        let y = Math.trunc(Math.round(evt.clientY - rect.top) / 95);
        let square = this.getSquare(x, y);

        window.dispatchEvent(new CustomEvent('boardClick', { detail: square }));
    }
    
    unDrawValidMovements(validMovements)
    {
        validMovements.map(item => {
            let coordinates = item.getCoordinatesFromName();
            
            this.#drawSquare(item.getColor(), coordinates.x, coordinates.y);
            
            if(!item.isEmpty())
            {
                this.#printPiece(item.getPiece().getSrc(), coordinates.x, coordinates.y);
            }
        })
        
    }

    drawValidMovements(validMovements)
    {
        validMovements.map(item => {
            let coordinates = item.getCoordinatesFromName();
            
            this.#drawSquare(GREEN, coordinates.x, coordinates.y);
            if(!item.isEmpty())
            {
                this.#printPiece(item.getPiece().getSrc(), coordinates.x, coordinates.y);
            }
        })
    }
    
    castlingMove(kingSquare, destinationSquare)
    {
        let kingIndex = this.#getIndexFromFileRank(kingSquare.getFile(), kingSquare.getRank())
        let destiantionIndex = this.#getIndexFromFileRank(destinationSquare.getFile(), destinationSquare.getRank())
        let rook;
        let rookdestination;

        if(kingIndex > destiantionIndex)
        {
            kingSquare.getPiece().getColor() == "white" ? rook = this.#squares[91] : rook = this.#squares[21];
            kingSquare.getPiece().getColor() == "white" ? rookdestination = this.#squares[94] : rookdestination = this.#squares[24];
        }
        else if(kingIndex < destiantionIndex)
        {
            kingSquare.getPiece().getColor() == "white" ? rook = this.#squares[98] : rook = this.#squares[28];
            kingSquare.getPiece().getColor() == "white" ? rookdestination = this.#squares[96] : rookdestination = this.#squares[26];
        }
        this.movePiece(kingSquare, destinationSquare);
        this.movePiece(rook, rookdestination); 
    }
    
    movePiece(pieceSquare, destinationSquare)
    {
        let actualCoordinates = pieceSquare.getCoordinatesFromName();
        let destinationCoordinates = destinationSquare.getCoordinatesFromName();

        this.#drawSquare(pieceSquare.getColor(), actualCoordinates.x, actualCoordinates.y);
        this.#drawSquare(destinationSquare.getColor(), destinationCoordinates.x, destinationCoordinates.y);
        
        destinationSquare.setPiece(pieceSquare.getPiece());

        this.#printPiece(destinationSquare.getPiece().getSrc(), destinationCoordinates.x, destinationCoordinates.y);
        
        if(destinationSquare.getPiece().getType() == "king")
        { 
            destinationSquare.getPiece().getColor() == "white" ? whiteKing = destinationSquare : blackKing = destinationSquare;
            destinationSquare.getPiece().getColor() == "white" ? whiteCastling.king = false : blackCastling.king = false;
        }
        if(pieceSquare.getPiece().getType() == "rook")
        {
          if(pieceSquare.getFile() == "A")
          {
            pieceSquare.getPiece().getColor() == "white" ? whiteCastling.queenRook = false : blackCastling.queenRook = false; 
          }
          else if(pieceSquare.getFile() == "H")
          {
            pieceSquare.getPiece().getColor() == "white" ? whiteCastling.kingRook = false : blackCastling.kingRook = false; 
          }
        }
        pieceSquare.deletePiece();
    }

    ///////////////////////
    ///////METHODS/////////
    ///////////////////////

    #drawSquare(color, x, y)
    {
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(x * this.#squaresize, y * this.#squaresize, this.#squaresize, this.#squaresize);  
    }
    
    #setStartPiecesPos()
    {
        let color = "black";
        let y = 8;
        let x = 1;
        
        for(var i = 0; i < 2; i++)
        {
            let rookA = new Rook(color);
            this.setPiece("A", y, rookA);

            let knightB = new Knight(color);
            this.setPiece("B", y, knightB);

            let bishopC = new Bishop(color);
            this.setPiece("C", y, bishopC);

            let king = new King(color);
            this.setPiece("E", y, king);

            let queen = new Queen(color);
            this.setPiece("D", y, queen);

            let bishopF = new Bishop(color);
            this.setPiece("F", y, bishopF);

            let knightG = new Knight(color);
            this.setPiece("G", y, knightG); 

            let rookH = new Rook(color);
            this.setPiece("H", y, rookH);


            for(var r = 0; r < 8; r++)
            { 
                let pawn = new Pawn(color);
                this.setPiece(String.fromCharCode(65 + r), y - x, pawn);
            }

            color = "white";
            y = 1;
            x = - 1;
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
                    this.#drawSquare(this.#lightColor, c, r);
                }
                else
                {
                    this.#squares[tmp] = new Square(this.#darkColor, squareName);
                    this.#drawSquare(this.#darkColor, c, r);
                }
                drawWhite = !drawWhite;
            }
            switchName--;
            drawWhite = !drawWhite;
        }
        this.#setStartPiecesPos();

        //Async function
        this.#printAllPieces();
    }

    #printPiece(src, x, y)
    {
        let img = new Image();
        img.src = src;
        //Async function
        //img.decode();
   
        //Async function
        img.onload = (() =>
        {
            this.#ctx.drawImage(img, x * this.#squaresize, y * this.#squaresize, this.#squaresize, this.#squaresize);
        }).bind(this)
    }

    #printAllPieces()
    { 
        let coordinates = (f, r) => this.#squares[f + r].getCoordinatesFromName();
      

        for(var i = 0; i < 8; i++)
        {
            this.#printPiece(this.#squares[i + 21].getPiece().getSrc(), coordinates(i, 21).x, coordinates(i, 21).y);
            this.#printPiece(this.#squares[i + 31].getPiece().getSrc(), coordinates(i, 31).x, coordinates(i, 31).y);
        }
    
        for(var i = 0; i < 8; i++)
        { 
            this.#printPiece(this.#squares[i + 91].getPiece().getSrc(), coordinates(i, 91).x, coordinates(i, 91).y);
            this.#printPiece(this.#squares[i + 81].getPiece().getSrc(), coordinates(i, 81).x, coordinates(i, 81).y);
        }
    }  

    calculatePosition(squareName, direction)
    {
        let squareIndex = this.#getIndexFromFileRank(squareName.charAt(0), squareName.charAt(1));
        let destinationSquareIndex = squareIndex + direction;

        return this.#squares[destinationSquareIndex];
    }
 
}

