class Pawn extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"pawn", file, rank);

        if(color === "white")
        {
            this.#PIECE_DIRECTONS = ["UP", "UP_LEFT", "UP_RIGHT"];
        }
        else if(color === "black")
        {
            this.#PIECE_DIRECTONS = ["DOWN", "DOWN_LEFT", "DOWN_RIGHT"];
        }
    }
    #PIECE_DIRECTION_VALUE =
    {
        UP:-10,
        UP_LEFT:-9,
        UP_RIGHT:-11,
        DOWN:10,
        DOWN_LEFT:9,
        DOWN_RIGHT:11
    };

    getValidMovements(board)
    {
        
    }


    
}