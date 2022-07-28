class Knight extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"knight");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP_UP_RIGHT, DIRECTION_VALUE.UP_UP_LEFT, DIRECTION_VALUE.LEFT_LEFT_UP, DIRECTION_VALUE.LEFT_LEFT_DOWN, 
            DIRECTION_VALUE.DOWN_DOWN_LEFT, DIRECTION_VALUE.DOWN_DOWN_RIGHT, DIRECTION_VALUE.RIGHT_RIGHT_DOWN, DIRECTION_VALUE.RIGHT_RIGHT_UP];
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

            if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.isEmpty())
            {
                validMovements.push(destinationSquare);
            }
            else if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.getPiece().getColor() != this.getColor())
            {
                validMovements.push(destinationSquare);
            }
        }, this)
        
        return super.allChecks(board, validMovements);   
    }


    
}