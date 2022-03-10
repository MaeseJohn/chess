class King extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"king", file, rank);
        this.#PIECE_DIRECTONS = ["UP", "LEFT", "RIGHT", "DOWN"];
    }
    #PIECE_DIRECTION_VALUE =
    {
        UP:-10,
        LEFT:-1,
        RIGHT:1,
        DOWN:10,
    };

    getValidMovements(board)
    {
        
    }


    
}