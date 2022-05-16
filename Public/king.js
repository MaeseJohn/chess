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
    
    #castling(board, square)
    {
        let destinationSquare;
        let castlingMovements = []; 
        let castlingColor = this.getColor() == "white" ? whiteCastling : blackCastling;
    
        if(castlingColor.king)
        {
            if(castlingColor.queenRook)
            {
                destinationSquare = board.calculatePosition(square.getName(), DIRECTION_VALUE.LEFT);
                while(destinationSquare.isEmpty() && destinationSquare.getName() != 'outOfBoard')
                {
                    if(kingInCheck(destinationSquare).length != 0)
                    {
                        break
                    }
                    destinationSquare = board.calculatePosition(destinationSquare.getName(), DIRECTION_VALUE.LEFT);
                }
                
                if(destinationSquare.getName() != 'outOfBoard' && !destinationSquare.isEmpty())
                {
                    if(destinationSquare.getPiece().getType() == 'rook')
                    {
                        castlingMovements.push(board.getSquareFromFileRank('C', square.getRank()));
                    } 
                }
            }

            if(castlingColor.kingRook)
            {
                destinationSquare = board.calculatePosition(square.getName(), DIRECTION_VALUE.RIGHT);
                while(destinationSquare.isEmpty() && destinationSquare.getName() != 'outOfBoard')
                {
                    if(kingInCheck(destinationSquare).length != 0)
                    {
                        break
                    }
                    destinationSquare = board.calculatePosition(destinationSquare.getName(), DIRECTION_VALUE.RIGHT);
                }
        
                if(destinationSquare.getName() != 'outOfBoard' && !destinationSquare.isEmpty())
                {
                    if(destinationSquare.getPiece().getType() == 'rook')
                    {
                        castlingMovements.push(board.getSquareFromFileRank('G', square.getRank()));
                    }
                }
            }
         
        }
        return castlingMovements;      
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
                    validMovements.push(destinationSquare);
                }  
                destinationSquare.setPiece(tmp);
            }

        }, this)
        validMovements = this.#castling(board, square).concat(validMovements); 
        return validMovements; 
    }


    
}