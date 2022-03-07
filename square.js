class Square
{
    #color;
    #name;
    #piece;
    constructor(color, name)
    {
        this.#color = color;
        this.#name  = name;
    }


    getName()
    {
        return this.#name;
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
    
    getPiece()
    {
        return this.#piece;
    }

    getColor()
    {
        return this.#color;
    }
}