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


    #getIndexFromSquareName(name)
    {
        return (name.charCodeAt(0) - 44 + (name.charCodeAt(1) - 56) * - 10);
    }
    
    #getIndexFromFileRank(file, rank)
    {
        return file.charCodeAt(0) - 44 + (rank - 8) * -10;
    }

    #getCoordinatesFormFileRank(name)
    {
        let coordinates = 
        {
            x: 0,
            y: 0
        }
        coordinates.x = name.charCodeAt(0) - 65;
        coordinates.y = (name.charCodeAt(1) - 56) * - 1;
        
        return coordinates;
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
    
    
    /////////////////////////////////
    ////////MOVEMETS METHODS/////////
   ///////////////////////////////// 

    #boardClickEvent(evt)
    {
        let rect = this.#cv.getBoundingClientRect();
        let x = Math.trunc(Math.round(evt.clientX - rect.left) / 100);
        let y = Math.trunc(Math.round(evt.clientY - rect.top) / 100);
        
        let actualSquare = this.getSquare(x, y);
        //const event = new CustomEvent('boardClick', { detail: actualSquare });
        window.dispatchEvent(new CustomEvent('boardClick', { detail: actualSquare }));
    }
    
    unDrawValidMovements(validMovements)
    {
        validMovements.map(item => {
            let coordinates = this.#getCoordinatesFormFileRank(item.getName());
            
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
            let coordinates = this.#getCoordinatesFormFileRank(item.getName());
            
            this.#drawSquare(GREEN, coordinates.x, coordinates.y);
            if(!item.isEmpty())
            {
                this.#printPiece(item.getPiece().getSrc(), coordinates.x, coordinates.y);
            }
        })
    }
    
    movePiece(actualSquare, destinationSquare)
    {
        let actualCoordinates = this.#getCoordinatesFormFileRank(actualSquare.getName());
        let destinationCoordinates = this.#getCoordinatesFormFileRank(destinationSquare.getName());

        this.#drawSquare(actualSquare.getColor(), actualCoordinates.x, actualCoordinates.y);
        this.#drawSquare(destinationSquare.getColor(), destinationCoordinates.x, destinationCoordinates.y);
        
        destinationSquare.setPiece(actualSquare.getPiece());
        actualSquare.deletePiece();

        this.#printPiece(destinationSquare.getPiece().getSrc(), destinationCoordinates.x, destinationCoordinates.y);    
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
            this.setPiece("D", y, king);

            let queen = new Queen(color);
            this.setPiece("E", y, queen);

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
        let coordinates = (f, r) => this.#getCoordinatesFormFileRank(this.#squares[f + r].getName());
      

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
        let squareIndex = this.#getIndexFromSquareName(squareName);
        let destinationSquareIndex = squareIndex + direction;

        return this.#squares[destinationSquareIndex];
    }
 
}

