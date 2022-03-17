class Pawn extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color, file, rank)
    {
        super(color,"pawn", file, rank);

        if(color === "white")
        {
            this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT];
        }
        else if(color === "black")
        {
            this.#PIECE_DIRECTONS = [DIRECTION_VALUE.DOWN, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
        }
    }

    getValidMovements(board)
    {
        let validMovements = [];

        this.#PIECE_DIRECTONS.map(direction => {
            let destinationSquare = board.calculatePosition(this.getFile(), this.getRank(), direction);
            if(direction === DIRECTION_VALUE.UP || direction === DIRECTION_VALUE.DOWN)
            {
                console.log(destinationSquare);
                if(destinationSquare.isEmpty())
                {
                    validMovements.push(destinationSquare);
                }
            }
            else if(!destinationSquare.isEmpty())
            {
                if(destinationSquare.getPiece().getColor() != this.getColor())
                {
                    validMovements.push(destinationSquare);
                }
            }
        })
        
        return validMovements;
    }  
}