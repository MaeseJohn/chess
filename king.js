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
    
    #castling(board, square, validMovements)
    {
        let tmp;
        let destinationSquare;
        let castlingMovements = [];
        if(this.getColor() == "white")
        {
            if(whiteCastling.king)
            {
                if(whiteCastling.queenRook)
                {
                    destinationSquare = board.calculatePosition(square.getName(), DIRECTION_VALUE.LEFT)
                    tmp = validMovements.find(item => item == destinationSquare);
                    if(tmp != undefined)
                    {
                        destinationSquare = board.calculatePosition(destinationSquare.getName(), DIRECTION_VALUE.LEFT)
                        if(kingInCheck(destinationSquare).length == 0)
                        {
                            castlingMovements.push(destinationSquare);
                        }
                    }

                }

                if(whiteCastling.kingRook)
                {

                    destinationSquare = board.calculatePosition(square.getName(), DIRECTION_VALUE.RIGHT)
                    tmp = validMovements.find(item => item == destinationSquare);
                    if(tmp != undefined)
                    {
                        console.log("y aqui?")
                        destinationSquare = board.calculatePosition(destinationSquare.getName(), DIRECTION_VALUE.RIGHT)
                        if(kingInCheck(destinationSquare).length == 0)
                        {
                            console.log("dentro")
                            castlingMovements.push(destinationSquare);
                        }
                    }

                }
            }
        }

        if(this.getColor() == "black")
        {
            if(blackCastling.king)
            {
                if(blackCastling.queenRook)
                {
                    destinationSquare = board.calculatePosition(square.getName(), DIRECTION_VALUE.LEFT)
                    tmp = validMovements.find(item => item == destinationSquare);
                    if(tmp != undefined)
                    {
                        destinationSquare = board.calculatePosition(destinationSquare.getName(), DIRECTION_VALUE.LEFT)
                        if(kingInCheck(destinationSquare).length == 0)
                        {
                            castlingMovements.push(destinationSquare);
                        }
                    }
                }

                if(blackCastling.kingRook)
                {

                    destinationSquare = board.calculatePosition(square.getName(), DIRECTION_VALUE.RIGHT)
                    tmp = validMovements.find(item => item == destinationSquare);
                    if(tmp != undefined)
                    {
                        console.log("y aqui?")
                        destinationSquare = board.calculatePosition(destinationSquare.getName(), DIRECTION_VALUE.RIGHT)
                        if(kingInCheck(destinationSquare).length == 0)
                        {
                            console.log("dentro")
                            castlingMovements.push(destinationSquare);
                        }
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
        let asdf = this.#castling(board, square, validMovements).concat(validMovements); 
        console.log(asdf)
        return asdf; 
    }


    
}