class King extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"king");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT, DIRECTION_VALUE.DOWN];
    }


    getValidMovements(board)
    {
        
    }


    
}