class Square
{
    #color;
    #name;
    #piece;
    constructor(color, name = 'outOfBoard')
    {
        this.#color = color;
        this.#name  = name;
    }


    deletePiece()
    {
        this.#piece = null;
    }
    
    isOutOfBoard()
    {
        return this.#color == undefined;
    }
    
    isEmpty()
    {
        return (this.#piece == null);
    }
    
    setPiece(piece)
    {
        this.#piece = piece;
    }
    
    getName()
    {
        return this.#name;
    }
    
    getFile()
    {
        return this.#name.charAt(0);
    }

    getRank()
    {
        return this.#name.charAt(1);
    }

    getPiece()
    {
        return this.#piece;
    }

    getColor()
    {
        return this.#color;
    }
}