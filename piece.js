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
                        pieceDirections = pieceDirections.filter(item => { 
                            return pieceMovements.indexOf(item) !== -1;
                        })

                        console.log("5");

                        //This piece of code have problems
                        //I think when u compare 2 array u compare the same elemet a lot of times
                        //So if u see that this element is true 1 time but false 2 time
                        //This element dont enter in the new array I'm not totali sure
                        //REMEBER SEAR SOME INFORMATION ABOUT THIS
                       /*pieceDirections.filter(item => {
                            pieceDirections = pieceMovements.filter(move => {
                                console.log(item, move);
                                return move == item;
                            })
                        })*/
                        console.log(pieceDirections);
                        return pieceDirections;
                    }
                }
            }
       }
       console.log("6");
       return pieceMovements;
    }

    #lineMovementsBetwenKingPiece(board, king, direction)
    {
        let blockSquares = [];
        let destinationSquare = board.calculatePosition(king.getName(), direction);
        blockSquares.push(destinationSquare);

        while(destinationSquare.isEmpty())
        {
            console.log("equisde");
            destinationSquare = board.calculatePosition(destinationSquare.getName(), direction);
            blockSquares.push(destinationSquare);
        }

        console.log("mirar aqui")
        console.log(blockSquares);
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
                console.log("entre");
                let kingPieceDirection = this.#kingPieceDirection(checks[0], king);
                blockSquares = this.#lineMovementsBetwenKingPiece(board, king, kingPieceDirection);

                console.log(blockSquares);
                console.log(pieceMovements);
                blockSquares = blockSquares.filter(square => {
                    return pieceMovements.indexOf(square) !== -1;
                })
                console.log(blockSquares);
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