class Bishop extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"bishop");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
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
           console.log(destinationSquare);
            if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.getPiece().getColor() != this.getColor())
            {
                validMovements.push(destinationSquare);
            }
        }, this)
        
        return validMovements;
        
    }


    
}