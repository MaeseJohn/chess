class Queen extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"queen");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT, DIRECTION_VALUE.DOWN, 
            DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
    }


    getValidMovements(board)
    {
        
    }


    
}