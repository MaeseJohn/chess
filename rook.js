class Rook extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"rook", file, rank);
        this.#PIECE_DIRECTONS = ["UP", "DOWN", "LEFT", "RIGHT"];
    }
    #PIECE_DIRECTION_VALUE =
    {
        UP:-10,
        DOWN:10,
        LEFT:-1,
        RIGHT:1
    };

    getValidMovements(board)
    {
        
    }


    
}