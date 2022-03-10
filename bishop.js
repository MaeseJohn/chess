class Bishop extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"bishop", file, rank);
        this.#PIECE_DIRECTONS = ["UP_LEFT", "UP_RIGHT", "DOWN_LEFT", "DOWN_RIGHT"];
    }
    #PIECE_DIRECTION_VALUE =
    {
        UP_LEFT:-11,
        UP_RIGHT:-9,
        DOWN_LEFT:9,
        DOWN_RIGHT:11
    };

    getValidMovements(board)
    {
        
    }


    
}