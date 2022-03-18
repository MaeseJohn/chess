class Bishop extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"bishop");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
    }

    getValidMovements(board)
    {
        
    }


    
}