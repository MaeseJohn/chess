class Queen extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"queen", file, rank);
        this.#PIECE_DIRECTONS = ["UP", "LEFT", "RIGHT", "DOWN", "UP_LEFT", "UP_RIGHT", "DOWN_LEFT", "DOWN_RIGHT"];
    }
    #PIECE_DIRECTION_VALUE =
    {
        UP:-10,
        LEFT:-1,
        RIGHT:1,
        DOWN:10,
        UP_LEFT:-11,
        UP_RIGHT:-9,
        DOWN_LEFT:9,
        DOWN_RIGHT:11
    };

    getValidMovements(board)
    {
        
    }


    
}