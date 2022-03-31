class Pawn extends Piece
{
    #PIECE_DIRECTONS;

    constructor(color)
    {
        super(color,"pawn");

        if(color === "white")
        {
            this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT];
        }
        else if(color === "black")
        {
            this.#PIECE_DIRECTONS = [DIRECTION_VALUE.DOWN, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
        }
    }

    getPieceDirections()
    {
        return this.#PIECE_DIRECTONS;
    }

    getValidMovements(board, square)
    {
        let validMovements = [];
        let pieceDirections = super.anchoredByCheck(board, square, this.#PIECE_DIRECTONS);

        pieceDirections.map(direction => {
        
            let destinationSquare = board.calculatePosition(square.getName(), direction);
            
            if(direction === DIRECTION_VALUE.UP || direction === DIRECTION_VALUE.DOWN)
            {
                if(destinationSquare.isEmpty())
                {
                    validMovements.push(destinationSquare);

                    if(square.getRank() == 7 || square.getRank() == 2)
                    {
                        let firstMoveDestination = board.calculatePosition(destinationSquare.getName(), direction);
    
                        if(firstMoveDestination.isEmpty())
                        {
                            validMovements.push(firstMoveDestination); 
                        }
                    }
                }
            }
            else if(!destinationSquare.isEmpty())
            {
                if(destinationSquare.getPiece().getColor() != this.getColor())
                {
                    validMovements.push(destinationSquare);
                }
            }
        }, this)
        
        return super.allChecks(board, validMovements);
    }  
}