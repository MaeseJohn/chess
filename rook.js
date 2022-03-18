class Rook extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"rook");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.DOWN, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT];
    }


    getValidMovements(board)
    {
        
    }


    
}