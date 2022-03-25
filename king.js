class King extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"king");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT, DIRECTION_VALUE.DOWN, 
            DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
    }


    getValidMovements(board, square)
    {
        let validMovements = [];

        this.#PIECE_DIRECTONS.map(direction => {
        
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
        
        return validMovements; 
    }


    
}