class King extends Piece
{
    #PIECE_DIRECTONS;
    constructor(color)
    {
        super(color,"king");
        this.#PIECE_DIRECTONS = [DIRECTION_VALUE.UP, DIRECTION_VALUE.LEFT, DIRECTION_VALUE.RIGHT, DIRECTION_VALUE.DOWN, 
            DIRECTION_VALUE.UP_LEFT, DIRECTION_VALUE.UP_RIGHT, DIRECTION_VALUE.DOWN_LEFT, DIRECTION_VALUE.DOWN_RIGHT];
    }

    getPieceDirections()
    {
        return this.#PIECE_DIRECTONS;
    }


    getValidMovements(board, square)
    {
        let validMovements = [];

        this.#PIECE_DIRECTONS.map(direction => {
        
            let destinationSquare = board.calculatePosition(square.getName(), direction);
            

            if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.isEmpty())
            {  
                if(kingInCheck(destinationSquare).length == 0)
                {
                    validMovements.push(destinationSquare);
                }
            }
            else if(destinationSquare.getName() != 'outOfBoard' && destinationSquare.getPiece().getColor() != this.getColor())
            {
                let tmp = destinationSquare.getPiece()
                destinationSquare.setPiece(square.getPiece());
                if(kingInCheck(destinationSquare).length == 0)
                {
                    console.log("que pasa aqui");
                    validMovements.push(destinationSquare);
                }  
                destinationSquare.setPiece(tmp);
            }

        }, this)
        
        console.log(validMovements);
        return validMovements; 
    }


    
}