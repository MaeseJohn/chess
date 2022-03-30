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

    getCoordinatesFromName()
    {
        let coordinates = 
        {
            x: 0,
            y: 0
        }
        coordinates.x = this.#name.charCodeAt(0) - 65;
        coordinates.y = (this.#name.charCodeAt(1) - 56) * - 1;
        
        return coordinates;
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