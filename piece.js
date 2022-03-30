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
           console.log("1");
           let destinationSquare = board.calculatePosition(king.getName(), kingPieceDirection);
           console.log(destinationSquare);

           while(destinationSquare.getName() != 'outOfBoard' && (destinationSquare.isEmpty() || destinationSquare.getPiece() == square.getPiece()))
           {
               console.log("2")
               destinationSquare = board.calculatePosition(destinationSquare.getName(), kingPieceDirection);
           }
           
           if(destinationSquare.getName() != 'outOfBoard')
           {
               console.log("3");
                if(destinationSquare.getPiece().getColor() != king.getPiece().getColor() && destinationSquare.getPiece().getType() != "pawn" && destinationSquare.getPiece().getType() != "king")
                {
                    console.log("4");
                    pieceDirections = destinationSquare.getPiece().getPieceDirections();
                    console.log(pieceDirections);
                    pieceDirections = pieceDirections.filter(item  => {
                        return Math.abs(item) == Math.abs(kingPieceDirection);
                    })
                    console.log(pieceDirections);
                    
                    if(pieceDirections.length > 0)
                    {
                        console.log("5");
                        pieceDirections.filter(item => {
                            pieceDirections = pieceMovements.filter(move => {
                                console.log(item, move);
                                return move == item;
                            })
                        })
                        console.log(pieceDirections);
                        return pieceDirections;
                    }
                }
            }
       }
       console.log("6");
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