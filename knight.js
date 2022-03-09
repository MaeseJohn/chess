class Knight extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"knight", file, rank);
        this.#PIECE_DIRECTONS = ["UP_UP_RIGHT", "UP_UP_LEFT", "LEFT_LEFT_UP", "LEFT_LEFT_DOWN", "DOWN_DOWN_LEFT", "DOWN_DOWN_RIGHT", "RIGHT_RIGHT_DOWN", "RIGHT_RIGHT_UP"];
    }
    #PIECE_DIRECTION_VALUE =
    {
        UP_UP_RIGHT:-19,
        UP_UP_LEFT:-21,
        LEFT_LEFT_UP:-12,
        LEFT_LEFT_DOWN:8,
        DOWN_DOWN_LEFT:19,
        DOWN_DOWN_RIGHT:21,
        RIGHT_RIGHT_DOWN:12, 
        RIGHT_RIGHT_UP:-8
    };

    getValidMovements(board)
    {
        
    }


    
}