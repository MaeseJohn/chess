class Rook extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"rook");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.DOWN, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT];
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

            while(destinationSquare.getName() != 'outOfBoard' && destinationSquare.isEmpty())
            {
                validMovements.push(destinationSquare);
                destinationSquare = board.calculatePosition(destinationSquare.getName(), direction);   
            }
            if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.getPiece().getColor() != this.getColor())
            {
                validMovements.push(destinationSquare);
            }
        }, this)
        
        return super.allChecks(board, validMovements);
        
    }


    
}