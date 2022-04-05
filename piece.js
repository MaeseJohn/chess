const VALID_MOVES_COLOR = 'rgba(145, 201, 48, 0.5)';

class Piece
{
    #color;
    #type;
    #src;
    constructor(color, type)
    {
        this.#color  = color;
        this.#type = type;
        this.#src = "pieces/" + color + "/" + color + "-" + type + ".png";
    }

    #kingPieceDirection(square, king)
    {      
        //CABALLO NO CONTEMPLADO  
        let kingCoordinates = king.getCoordinatesFromName();
        let squareCoordinates = square.getCoordinatesFromName();
        let xSubtraction = kingCoordinates.x - squareCoordinates.x
        let ySubtraction = kingCoordinates.y - squareCoordinates.y
        
        let kingPieceDirection;
        
        if(Math.abs(xSubtraction) == Math.abs(ySubtraction))
        {
            xSubtraction > 0 ? kingPieceDirection = DIRECTION_VALUE.LEFT : kingPieceDirection = DIRECTION_VALUE.RIGHT;
            ySubtraction > 0 ? kingPieceDirection += DIRECTION_VALUE.UP : kingPieceDirection += DIRECTION_VALUE.DOWN;
        }
        else if(xSubtraction == 0)
        {
            ySubtraction > 0 ? kingPieceDirection = DIRECTION_VALUE.UP : kingPieceDirection = DIRECTION_VALUE.DOWN;
        }
        else if(ySubtraction == 0)
        {
            xSubtraction > 0 ? kingPieceDirection = DIRECTION_VALUE.LEFT : kingPieceDirection = DIRECTION_VALUE.RIGHT;
        }

        return kingPieceDirection;
    }

    anchoredByCheck(board, square, pieceMovements)
    {
        let king;
        this.#color == "white" ? king = whiteKing : king = blackKing;

        let kingPieceDirection = this.#kingPieceDirection(square, king);
        let pieceDirections;

       if(kingPieceDirection != undefined)
       {
           let destinationSquare = board.calculatePosition(king.getName(), kingPieceDirection);

           while(destinationSquare.getName() != 'outOfBoard' && (destinationSquare.isEmpty() || destinationSquare.getPiece() == square.getPiece()))
           {
               destinationSquare = board.calculatePosition(destinationSquare.getName(), kingPieceDirection);
           }
           
           if(destinationSquare.getName() != 'outOfBoard')
           {
                if(destinationSquare.getPiece().getColor() != king.getPiece().getColor() && destinationSquare.getPiece().getType() != "pawn" && destinationSquare.getPiece().getType() != "king")
                {
                    pieceDirections = destinationSquare.getPiece().getPieceDirections();
                    pieceDirections = pieceDirections.filter(item  => {
                        return Math.abs(item) == Math.abs(kingPieceDirection);
                    })
                    
                    if(pieceDirections.length > 0)
                    {
                        pieceDirections = pieceDirections.filter(item => { 
                            return pieceMovements.indexOf(item) !== -1;
                        })
                        return pieceDirections;
                    }
                }
            }
       }
       return pieceMovements;
    }

    #lineMovementsBetwenKingPiece(board, king, direction)
    {
        let blockSquares = [];
        if(direction != undefined)
        {
            let destinationSquare = board.calculatePosition(king.getName(), direction);
            blockSquares.push(destinationSquare);
            

            while(destinationSquare.isEmpty())
            {
                destinationSquare = board.calculatePosition(destinationSquare.getName(), direction);
                blockSquares.push(destinationSquare);
            }
        }
        return blockSquares;
    }

    allChecks(board, pieceMovements)
    {
        let king;
        this.#color == "white" ? king = whiteKing : king = blackKing;
        let blockSquares = [];
        

        if(turn == this.#color)
        {
            if(checks.length == 1)
            {
                let kingPieceDirection = this.#kingPieceDirection(checks[0], king);
                blockSquares = this.#lineMovementsBetwenKingPiece(board, king, kingPieceDirection);

                blockSquares = blockSquares.filter(square => {
                    return pieceMovements.indexOf(square) !== -1;
                })
                return blockSquares;
            }
            else if (checks.length > 1)
            {
                return blockSquares;
            }
        }

        return pieceMovements;
    }

    getType()
    {
        return this.#type;
    }

    getColor()
    {
        return this.#color;
    }
    
    getSrc()
    {
        return this.#src;
    }
}